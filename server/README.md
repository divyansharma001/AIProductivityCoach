# Productivity SaaS Backend

A simple TypeScript Express backend for managing a waitlist with MongoDB database.

## Features

- Add emails to waitlist
- Get waitlist count
- Email validation
- Duplicate email prevention
- CORS enabled for frontend integration
- **Persistent MongoDB database storage**
- **Data survives server restarts**
- **Environment-based configuration**

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Copy the example file
cp env.example .env

# Edit the .env file with your configuration
```

3. Start MongoDB (if using local):
```bash
# Install MongoDB locally or use MongoDB Atlas (cloud)
# For local MongoDB, make sure it's running on port 27017
```

4. Build the project:
```bash
npm run build
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start

# Watch mode (auto-restart on changes)
npm run watch
```

## Environment Variables

Copy `env.example` to `.env` and configure:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/productivity-saas
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/productivity-saas

# CORS Configuration
CORS_ORIGIN_DEV=http://localhost:5173
CORS_ORIGIN_PROD=https://yourdomain.com
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Waitlist
- `POST /api/waitlist/join` - Add email to waitlist
  - Body: `{ "email": "user@example.com" }`
  - Returns: `{ "success": true, "message": "...", "totalCount": 123 }`

- `GET /api/waitlist/count` - Get waitlist count
  - Returns: `{ "success": true, "count": 123 }`

- `GET /api/waitlist/entries` - Get all waitlist entries (admin)
  - Returns: `{ "success": true, "entries": [...], "count": 123 }`

## Development

The server runs on `http://localhost:3001` by default and is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative dev server)

## Data Storage

✅ **MongoDB Database**: 
- Persistent storage with MongoDB
- Data survives server restarts
- Automatic schema validation
- Email uniqueness enforced at database level
- Indexed for performance

## Security

- **Production**: Minimal API info exposed
- **Development**: Full API documentation available
- Email validation and sanitization
- MongoDB injection protection via Mongoose
- CORS configured for frontend integration
- Environment-based configuration

## MongoDB Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/productivity-saas`

### MongoDB Atlas (Cloud)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env` 