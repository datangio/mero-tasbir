import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.isNewUser = account.isNewUser || false;
      }
      
      // Store the database user ID if available
      if (user?.databaseId) {
        token.databaseId = user.databaseId;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      session.isNewUser = token.isNewUser as boolean;
      session.databaseId = token.databaseId as string;
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log('User signing in:', { user, account, profile });
      
      // Always ensure user exists in our database for Google OAuth users
      if (account?.provider === 'google' && user.email) {
        try {
          // Check if user exists first, then create if needed
          const checkResponse = await fetch(`http://localhost:5000/api/v1/users/email/${encodeURIComponent(user.email)}`);
          
          if (!checkResponse.ok) {
            // User doesn't exist, create them (this is their first sign-up)
            console.log('Creating new user account for:', user.email);
            
            const createResponse = await fetch('http://localhost:5000/api/v1/users/create-or-update', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name || user.email.split('@')[0],
                provider: 'google',
              }),
            });

            if (createResponse.ok) {
              const data = await createResponse.json();
              console.log('New user account created successfully:', data);
              user.databaseId = data.data.id;
            } else {
              console.error('Failed to create new user account:', await createResponse.text());
            }
          } else {
            // User exists, get their info
            const userData = await checkResponse.json();
            console.log('Existing user found:', userData);
            user.databaseId = userData.data.id;
          }
        } catch (error) {
          console.error('Error handling user account:', error);
          // Don't block the sign-in process if user handling fails
        }
      }
      
      return true;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Set the base URL for NextAuth
  ...(process.env.NEXTAUTH_URL && { 
    url: process.env.NEXTAUTH_URL 
  }),
};
