# Email Configuration Setup

## Environment Variables

Add the following environment variables to your `.env` file in the `apps/api` directory:

```env
# Email Configuration (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"
```

## Gmail Setup

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication

### 2. Generate App Password
- Go to Google Account > Security > 2-Step Verification
- Click "App passwords"
- Generate a new app password for "Mail"
- Use this password as `SMTP_PASS`

### 3. Update Environment Variables
```env
SMTP_USER="your-gmail@gmail.com"
SMTP_PASS="your-16-character-app-password"
```

## Other Email Providers

### Outlook/Hotmail
```env
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_SECURE="false"
```

### Yahoo Mail
```env
SMTP_HOST="smtp.mail.yahoo.com"
SMTP_PORT="587"
SMTP_SECURE="false"
```

### Custom SMTP
```env
SMTP_HOST="your-smtp-server.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-password"
```

## Testing

1. Start the API server: `cd apps/api && npm run dev`
2. Test email sending by registering a new account
3. Check the console for email service status
4. Verify emails are received in the inbox

## Features

- ✅ **Verification Emails**: Beautiful HTML emails with OTP codes
- ✅ **Welcome Emails**: Professional welcome messages for new users
- ✅ **Error Handling**: Graceful fallback if email service fails
- ✅ **Template System**: Reusable email templates
- ✅ **Security**: Uses app passwords for Gmail
- ✅ **Responsive Design**: Mobile-friendly email templates






