# Spectra Development Guide

## Quick Start (Fixed Version)

This guide will help you get Spectra running locally with all fixes applied.

### Prerequisites

- Node.js 22+
- pnpm (package manager)
- Python 3 with OpenCV (for forensic analysis)

### Step 1: Install Dependencies

```bash
cd Spectra
pnpm install
```

### Step 2: Install Python Dependencies

```bash
pip3 install opencv-python scipy pillow numpy -q
```

### Step 3: Start Development Server

```bash
pnpm dev
```

The application will start at `http://localhost:3306`

---

## Configuration

### Environment Variables

The `.env` file contains all required configuration. Key variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `MOCK_OAUTH` | `true` | Enable mock OAuth for development (no external provider needed) |
| `OAUTH_SERVER_URL` | www.xyz.com | OAuth server URL |
| `VITE_OAUTH_PORTAL_URL` | www.xyz.com | OAuth portal URL for client |
| `JWT_SECRET` | `your-super-secret-jwt-key-...` | Secret key for session tokens |
| `DATABASE_URL` | `file:./dev.db` | Database connection string |
| `NODE_ENV` | `development` | Environment mode |
| `PORT` | `3000` | Server port |

### Mock OAuth Mode

When `MOCK_OAUTH=true`, the application uses a mock OAuth provider that doesn't require external authentication. This is perfect for local development.

**To login with mock OAuth:**
1. Click "Sign In to Start Analysis" on the home page
2. You'll be redirected to the mock OAuth flow
3. A test user will be created automatically
4. You'll be logged in and redirected to the dashboard



## Database Setup

### Initialize Database

```bash
pnpm db:push
```

This will:
- Generate database migrations
- Apply migrations to your database
- Create all required tables

### Database Types

The application supports multiple database types:

**SQLite (default for development):**
```
DATABASE_URL=file:./dev.db
```

**MySQL:**
```
DATABASE_URL=mysql://user:password@localhost:3306/spectra
```

**PostgreSQL:**
```
DATABASE_URL=postgresql://user:password@localhost:5432/spectra
```

---

## Common Commands

### Development

```bash
# Start development server with hot reload
pnpm dev

# Run type checking
pnpm check

# Format code
pnpm format
```

### Database

```bash
# Create and apply migrations
pnpm db:push

# Generate migration files
drizzle-kit generate

# Apply migrations
drizzle-kit migrate
```

### Testing & Building

```bash
# Run tests
pnpm test

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

### Database Connection Error

```bash
# Verify database tables exist
pnpm db:push

# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Missing Dependencies

```bash
# Clear cache and reinstall
rm -rf node_modules .pnpm-store
pnpm install
pnpm dev
```

### Python Dependencies Missing

```bash
# Reinstall Python packages
pip3 install --upgrade opencv-python scipy pillow numpy
```

### OAuth Issues

If you see "Missing session cookie" errors:

1. Ensure `JWT_SECRET` is set in `.env`
2. Check that `MOCK_OAUTH=true` for development
3. Clear browser cookies and try again

---

## Architecture

### Frontend (Client)

- **Framework:** React 19 with TypeScript
- **Routing:** Wouter (lightweight router)
- **Styling:** TailwindCSS
- **UI Components:** Radix UI
- **API Client:** tRPC + React Query

### Backend (Server)

- **Framework:** Express.js
- **API:** tRPC (type-safe RPC)
- **Database:** Drizzle ORM with MySQL/PostgreSQL/SQLite
- **Authentication:** JWT-based sessions with OAuth integration
- **File Storage:** AWS S3 (configurable)

### Forensic Analysis

- **Engine:** Python-based forensic analysis
- **Libraries:** OpenCV, SciPy, NumPy
- **Techniques:** Noise analysis, JPEG artifacts, ELA, frequency domain analysis

---

## Project Structure

```
Spectra/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React contexts
│   │   └── lib/           # Utilities and helpers
│   └── vite.config.ts     # Vite configuration
│
├── server/                 # Backend Express application
│   ├── _core/             # Core server functionality
│   │   ├── index.ts       # Server entry point
│   │   ├── oauth.ts       # OAuth routes
│   │   ├── sdk.ts         # OAuth SDK
│   │   ├── trpc.ts        # tRPC router setup
│   │   └── ...
│   ├── routers.ts         # tRPC route definitions
│   ├── db.ts              # Database queries
│   ├── storage.ts         # File storage
│   └── forensic_engine.py # Python forensic analysis
│
├── drizzle/               # Database schema and migrations
│   ├── schema.ts          # Drizzle ORM schema
│   └── migrations/        # SQL migration files
│
├── shared/                # Shared types and utilities
│   ├── types.ts           # Shared TypeScript types
│   └── const.ts           # Shared constants
│
├── .env                   # Environment variables
├── .env.example           # Example environment file
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── drizzle.config.ts      # Drizzle configuration
```

---

## Next Steps

1. **Explore the codebase:** Start with `client/src/App.tsx` and `server/_core/index.ts`
2. **Add features:** Extend the tRPC routers in `server/routers.ts`
3. **Customize UI:** Modify components in `client/src/components/`
4. **Improve forensics:** Enhance `server/forensic_engine.py`
5. **Deploy:** Build with `pnpm build` and deploy to your hosting platform

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the SETUP_GUIDE.md for additional details
3. Check server logs in the terminal for error messages
4. Ensure all environment variables are correctly set in `.env`

Happy coding! 🚀
