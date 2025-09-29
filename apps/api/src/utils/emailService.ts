import * as nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service configuration error:', error);
    console.error('Check your SMTP settings in .env file');
  } else {
    console.log('✅ Email service is ready to send messages');
    console.log('📧 SMTP Host:', emailConfig.host);
    console.log('📧 SMTP Port:', emailConfig.port);
    console.log('📧 SMTP User:', emailConfig.auth.user);
  }
});

// Email templates
export const emailTemplates = {
  verification: (otp: string, email: string) => ({
    subject: 'Verify Your Email - Mero Tasbir',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #E08E45;
            margin-bottom: 10px;
          }
          .otp-code {
            background-color: #f8f9fa;
            border: 2px solid #E08E45;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #E08E45;
            font-family: 'Courier New', monospace;
          }
          .message {
            margin: 20px 0;
            font-size: 16px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
          }
          .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Mero Tasbir</div>
            <h1>Verify Your Email Address</h1>
          </div>
          
          <div class="message">
            <p>Hello!</p>
            <p>Thank you for signing up with Mero Tasbir. To complete your registration, please verify your email address using the verification code below:</p>
          </div>
          
          <div class="otp-code">${otp}</div>
          
          <div class="message">
            <p>Enter this code in the verification field to complete your account setup.</p>
          </div>
          
          <div class="warning">
            <strong>Important:</strong> This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The Mero Tasbir Team</p>
            <p>If you have any questions, please contact us at support@merotasbir.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Mero Tasbir - Email Verification
      
      Hello!
      
      Thank you for signing up with Mero Tasbir. To complete your registration, please verify your email address using the verification code below:
      
      Verification Code: ${otp}
      
      Enter this code in the verification field to complete your account setup.
      
      Important: This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
      
      Best regards,
      The Mero Tasbir Team
      
      If you have any questions, please contact us at support@merotasbir.com
    `
  }),
  
  welcome: (userName: string) => ({
    subject: 'Welcome to Mero Tasbir!',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Mero Tasbir</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #E08E45;
            margin-bottom: 10px;
          }
          .message {
            margin: 20px 0;
            font-size: 16px;
          }
          .cta-button {
            display: inline-block;
            background-color: #E08E45;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Mero Tasbir</div>
            <h1>Welcome to Mero Tasbir!</h1>
          </div>
          
          <div class="message">
            <p>Hello ${userName}!</p>
            <p>Welcome to Mero Tasbir! Your account has been successfully created and verified.</p>
            <p>You can now access all our premium photography services, book photographers, and explore our marketplace.</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" class="cta-button">
              Go to Dashboard
            </a>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The Mero Tasbir Team</p>
            <p>If you have any questions, please contact us at support@merotasbir.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to Mero Tasbir!
      
      Hello ${userName}!
      
      Welcome to Mero Tasbir! Your account has been successfully created and verified.
      
      You can now access all our premium photography services, book photographers, and explore our marketplace.
      
      Visit your dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard
      
      Best regards,
      The Mero Tasbir Team
      
      If you have any questions, please contact us at support@merotasbir.com
    `
  }),

  resetPassword: (resetLink: string, userName: string) => ({
    subject: 'Reset Your Password - Mero Tasbir',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #E08E45;
            margin-bottom: 10px;
          }
          .reset-button {
            display: inline-block;
            background-color: #E08E45;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: bold;
            font-size: 16px;
          }
          .message {
            margin: 20px 0;
            font-size: 16px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
          }
          .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
          }
          .link-text {
            word-break: break-all;
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Mero Tasbir</div>
            <h1>Reset Your Password</h1>
          </div>
          
          <div class="message">
            <p>Hello ${userName}!</p>
            <p>We received a request to reset your password for your Mero Tasbir account. If you made this request, click the button below to reset your password:</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${resetLink}" class="reset-button">
              Reset My Password
            </a>
          </div>
          
          <div class="warning">
            <strong>Important:</strong> This link will expire in 1 hour for security reasons. If you didn't request this password reset, please ignore this email and your password will remain unchanged.
          </div>
          
          <div class="message">
            <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
            <div class="link-text">${resetLink}</div>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The Mero Tasbir Team</p>
            <p>If you have any questions, please contact us at support@merotasbir.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Reset Your Password - Mero Tasbir
      
      Hello ${userName}!
      
      We received a request to reset your password for your Mero Tasbir account. If you made this request, click the link below to reset your password:
      
      ${resetLink}
      
      Important: This link will expire in 1 hour for security reasons. If you didn't request this password reset, please ignore this email and your password will remain unchanged.
      
      Best regards,
      The Mero Tasbir Team
      
      If you have any questions, please contact us at support@merotasbir.com
    `
  }),

  bookingConfirmation: (bookingData: any) => ({
    subject: 'Booking Confirmation - Mero Tasbir',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #E08E45;
            margin-bottom: 10px;
          }
          .message {
            margin: 20px 0;
            font-size: 16px;
          }
          .booking-details {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .detail-label {
            font-weight: bold;
            color: #555;
          }
          .detail-value {
            color: #333;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
          }
          .success-message {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #155724;
          }
          .contact-info {
            background-color: #e7f3ff;
            border: 1px solid #b3d9ff;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #004085;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Mero Tasbir</div>
            <h1>Booking Confirmation</h1>
          </div>
          
          <div class="success-message">
            <strong>🎉 Thank you for your booking!</strong><br>
            Your booking request has been successfully submitted and we will contact you within 24 hours to confirm all details.
          </div>
          
          <div class="message">
            <p>Hello ${bookingData.fullName}!</p>
            <p>Thank you for choosing Mero Tasbir for your ${bookingData.eventType.toLowerCase()} event. We're excited to help make your special day unforgettable!</p>
          </div>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #E08E45;">Booking Details</h3>
            
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span class="detail-value">${bookingData.id}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Event Type:</span>
              <span class="detail-value">${bookingData.eventType}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Package:</span>
              <span class="detail-value">${bookingData.packageName}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Event Date:</span>
              <span class="detail-value">${new Date(bookingData.eventDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Event Time:</span>
              <span class="detail-value">${bookingData.eventTime}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Location:</span>
              <span class="detail-value">${bookingData.eventLocation}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Guest Count:</span>
              <span class="detail-value">${bookingData.guestCount} guests</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Package Price:</span>
              <span class="detail-value" style="font-weight: bold; color: #E08E45;">${bookingData.packagePrice}</span>
            </div>
            
            ${bookingData.specialRequirements ? `
            <div class="detail-row">
              <span class="detail-label">Special Requirements:</span>
              <span class="detail-value">${bookingData.specialRequirements}</span>
            </div>
            ` : ''}
          </div>
          
          <div class="contact-info">
            <h4 style="margin-top: 0;">📞 What's Next?</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Our team will review your booking and contact you within 24 hours</li>
              <li>We'll confirm all details and discuss any specific requirements</li>
              <li>You'll receive a final confirmation with payment instructions</li>
              <li>We'll be in touch closer to your event date for final preparations</li>
            </ul>
          </div>
          
          <div class="footer">
            <p><strong>Contact Information:</strong></p>
            <p>📧 Email: support@merotasbir.com</p>
            <p>📱 Phone: +977-1-XXXXXXX</p>
            <p>🌐 Website: www.merotasbir.com</p>
            <br>
            <p>Best regards,<br>The Mero Tasbir Team</p>
            <p><em>Capturing your precious moments, one frame at a time.</em></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Booking Confirmation - Mero Tasbir
      
      Hello ${bookingData.fullName}!
      
      Thank you for your booking! Your booking request has been successfully submitted and we will contact you within 24 hours to confirm all details.
      
      BOOKING DETAILS:
      ================
      Booking ID: ${bookingData.id}
      Event Type: ${bookingData.eventType}
      Package: ${bookingData.packageName}
      Event Date: ${new Date(bookingData.eventDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
      Event Time: ${bookingData.eventTime}
      Location: ${bookingData.eventLocation}
      Guest Count: ${bookingData.guestCount} guests
      Package Price: ${bookingData.packagePrice}
      ${bookingData.specialRequirements ? `Special Requirements: ${bookingData.specialRequirements}` : ''}
      
      WHAT'S NEXT:
      ============
      - Our team will review your booking and contact you within 24 hours
      - We'll confirm all details and discuss any specific requirements
      - You'll receive a final confirmation with payment instructions
      - We'll be in touch closer to your event date for final preparations
      
      Contact Information:
      ===================
      Email: support@merotasbir.com
      Phone: +977-1-XXXXXXX
      Website: www.merotasbir.com
      
      Best regards,
      The Mero Tasbir Team
      Capturing your precious moments, one frame at a time.
    `
  })
};

// Send email function
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<boolean> => {
  try {
    const mailOptions = {
      from: `"Mero Tasbir" <${process.env.SMTP_USER || 'noreply@merotasbir.com'}>`,
      to,
      subject,
      html,
      text,
    };

    console.log('📤 Attempting to send email to:', to);
    console.log('📤 Subject:', subject);
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Response:', info.response);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error('📧 To:', to);
    console.error('📧 Subject:', subject);
    console.error('❌ Error details:', error);
    
    // Log specific error types
    if (error instanceof Error) {
      console.error('❌ Error message:', error.message);
      console.error('❌ Error code:', (error as any).code);
    }
    
    return false;
  }
};

// Send verification email
export const sendVerificationEmail = async (email: string, otp: string): Promise<boolean> => {
  // Check if we should send real emails (set SEND_REAL_EMAILS=true in .env)
  const sendRealEmails = process.env.SEND_REAL_EMAILS === 'true';
  
  if (process.env.NODE_ENV === 'development' && !sendRealEmails) {
    console.log(`\n📧 VERIFICATION EMAIL (MOCK)`);
    console.log(`To: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log(`Expires in: 10 minutes`);
    console.log(`\n`);
    return true;
  }
  
  const template = emailTemplates.verification(otp, email);
  return await sendEmail(email, template.subject, template.html, template.text);
};

// Send welcome email
export const sendWelcomeEmail = async (email: string, userName: string): Promise<boolean> => {
  const template = emailTemplates.welcome(userName);
  return await sendEmail(email, template.subject, template.html, template.text);
};

// Send reset password email
export const sendResetPasswordEmail = async (email: string, resetLink: string, userName: string): Promise<boolean> => {
  const template = emailTemplates.resetPassword(resetLink, userName);
  return await sendEmail(email, template.subject, template.html, template.text);
};

// Send booking confirmation email
export const sendBookingConfirmationEmail = async (bookingData: any): Promise<boolean> => {
  // Check if we should send real emails (set SEND_REAL_EMAILS=true in .env)
  const sendRealEmails = process.env.SEND_REAL_EMAILS === 'true';
  
  if (process.env.NODE_ENV === 'development' && !sendRealEmails) {
    console.log(`\n📧 BOOKING CONFIRMATION EMAIL (MOCK)`);
    console.log(`To: ${bookingData.email}`);
    console.log(`Subject: Booking Confirmation - Mero Tasbir`);
    console.log(`Booking ID: ${bookingData.id}`);
    console.log(`Event: ${bookingData.eventType} on ${bookingData.eventDate}`);
    console.log(`Package: ${bookingData.packageName} - ${bookingData.packagePrice}`);
    console.log(`\n`);
    return true;
  }
  
  const template = emailTemplates.bookingConfirmation(bookingData);
  return await sendEmail(bookingData.email, template.subject, template.html, template.text);
};
