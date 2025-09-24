# Authentication API Setup

## Backend API Endpoints

The following authentication endpoints have been created:

### 1. Send Verification Email
- **POST** `/api/v1/auth/send-verification`
- **Body**: `{ "email": "user@example.com" }`
- **Response**: OTP sent to email

### 2. Verify OTP
- **POST** `/api/v1/auth/verify-otp`
- **Body**: `{ "email": "user@example.com", "otp": "123456" }`
- **Response**: Email verification status

### 3. Create User Account
- **POST** `/api/v1/auth/register`
- **Body**: 
```json
{
  "email": "user@example.com",
  "username": "username",
  "fullName": "Full Name",
  "address": "Complete Address",
  "password": "password123",
  "confirmPassword": "password123",
  "userType": "user"
}
```
- **Response**: User account created with JWT token

### 4. User Login
- **POST** `/api/v1/auth/login`
- **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: Login successful with JWT token

### 5. Resend OTP
- **POST** `/api/v1/auth/resend-otp`
- **Body**: `{ "email": "user@example.com" }`
- **Response**: New OTP sent to email

## Environment Variables

Create a `.env.local` file in the `apps/web` directory with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## Database Migration

The database has been updated with new tables:
- `users` - User accounts
- `email_verifications` - OTP verification records

## Features

- ✅ Email verification with OTP
- ✅ User registration with validation
- ✅ Secure password hashing
- ✅ JWT token authentication
- ✅ Step-by-step signup flow
- ✅ Form validation
- ✅ Error handling
- ✅ Token storage in localStorage

## Testing

1. Start the API server: `cd apps/api && npm run dev`
2. Start the web app: `cd apps/web && npm run dev`
3. Navigate to `/auth` to test the signup flow
4. Use any email address for testing (OTP will be logged to console)
