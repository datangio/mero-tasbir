# Mero Tasbir API

Express.js API built with TypeScript and Prisma for the Mero Tasbir project.

## Features

- **Express.js** with TypeScript
- **Centralized Configuration** with validation and type safety
- **RESTful API** with proper error handling
- **Environment-based** configuration
- **Clean architecture** with separation of concerns
- **Enterprise-grade Security** with comprehensive protection layers
- **Rate Limiting** and abuse prevention
- **Input Validation** and sanitization

## Security Features

### 🛡️ **Rate Limiting & Abuse Prevention:**
- **General API Limiter** - 100 requests per 15 minutes per IP
- **Authentication Limiter** - 5 attempts per 15 minutes per IP
- **Upload Limiter** - 10 uploads per hour per IP
- **Search Limiter** - 30 searches per 5 minutes per IP
- **Speed Limiter** - Gradual slowdown for abusive users

### 🔒 **Security Middleware:**
- **Helmet** - Security headers and protection
- **CORS** - Cross-origin resource sharing control
- **HPP Protection** - HTTP Parameter Pollution prevention
- **Request Size Limiting** - 10MB maximum payload
- **Method Validation** - Only allowed HTTP methods
- **Request Timeout** - 30 second timeout protection
- **Security Headers** - Additional security headers
- **User Agent Validation** - Bot and crawler blocking

### ✅ **Input Validation & Sanitization:**
- **Request Validation** - Comprehensive data validation
- **Input Sanitization** - Removes dangerous content
- **Type Checking** - Ensures data type safety
- **Length Validation** - Prevents oversized inputs
- **Format Validation** - Email, UUID, date validation

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

## Setup

1. **Install dependencies:**
```bash
pnpm install
```

2. **Set up environment variables:**
Create a `.env` file in the `apps/api` directory:
```bash
# Server Configuration
PORT=3001
HOST=localhost
NODE_ENV=development

# CORS Configuration (comma-separated origins)
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
```

3. **Build the project:**
```bash
pnpm build
```

## Development

Run in development mode with hot reload:
```bash
pnpm dev
```

## Production

Build and start the production server:
```bash
pnpm build
pnpm start
```

## API Endpoints

### Health Check
- `GET /api/v1/health` - Health check endpoint

### API Info
- `GET /api/v1` - API v1 information

## Project Structure

```
src/
├── index.ts              # Main application entry point
├── config/               # Configuration management
│   └── index.ts         # Centralized config with validation
├── middleware/           # Security and validation middleware
│   ├── index.ts         # Middleware exports
│   ├── rateLimiter.ts   # Rate limiting and abuse prevention
│   ├── security.ts      # Security middleware
│   └── validation.ts    # Input validation and sanitization
├── routes/               # Route definitions
│   ├── health.ts         # Health check routes
│   └── v1.ts            # API v1 routes
└── types/                # TypeScript type definitions
    └── index.ts         # Common types
```

## Configuration

The API uses a centralized configuration system that:

- **Validates** required environment variables on startup
- **Provides type safety** for all configuration values
- **Sets sensible defaults** for optional values
- **Environment-specific** logging and behavior

### Configuration Structure:
```typescript
import { config } from './config';

// Access configuration values
config.server.port          // Server port
config.server.host          // Server host
config.isDevelopment        // Environment check
```

## Security Configuration

### Rate Limiting:
```typescript
// Different limiters for different endpoints
app.use('/api/v1/auth', authLimiter);      // Stricter for auth
app.use('/api/v1/upload', uploadLimiter);  // File upload limits
app.use('/api/v1/search', searchLimiter);  // Search limits
```

### Validation:
```typescript
// Use validation middleware in routes
app.post('/api/v1/users', validateUserCreation, createUser);
app.put('/api/v1/users/:id', validateId, validateUserUpdate, updateUser);
```

### Security Headers:
- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-Content-Type-Options**: nosniff (prevents MIME sniffing)
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Restricts browser features
- **Content-Security-Policy**: Basic CSP implementation

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3001` | No |
| `HOST` | Server host | `localhost` | No |
| `NODE_ENV` | Environment | `development` | No |
| `CORS_ORIGIN` | Allowed origins (comma-separated) | `localhost:3000,3001` | No |
| `JWT_SECRET` | JWT signing secret | Random string | No |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` | No |

## Contributing

1. Configuration changes should go through `src/config/index.ts`
2. Security middleware should be added to appropriate directories
3. Test your changes with the provided endpoints
4. Follow the existing code structure and patterns
5. Ensure all new endpoints have proper validation and rate limiting
