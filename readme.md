# Banking API — Backend

A RESTful banking API built with **Node.js**, **TypeScript**, and **Express**, backed by **MongoDB**. Supports user registration, JWT authentication, bank account management, and transaction tracking.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18.x |
| Language | TypeScript |
| Framework | Express 4 |
| Database | MongoDB (Mongoose 7) |
| Auth | Passport.js (Local + JWT) |
| Validation | class-validator / class-transformer |
| Password hashing | bcrypt |
| Deployment | Azure Web Apps (GitHub Actions) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance
- `.env` file (see below)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_DB_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret
```

### Running

```bash
# Development (with hot reload via nodemon)
npm run dev

# Build TypeScript
npm run build

# Production
npm start
```

The server starts on **port 8080**.

---

## API Reference

All routes are prefixed with `/api`.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/register` | No | Register a new user |
| POST | `/api/login` | No | Log in and receive a JWT |
| PATCH | `/api/changePassword` | Yes | Change the current user's password |

#### `POST /api/register`

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "john@example.com",
  "password": "Password1!",
  "confermaPassword": "Password1!",
  "picture": "https://example.com/avatar.jpg"  // optional
}
```

Password rules: minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character.

#### `POST /api/login`

```json
{
  "username": "john@example.com",
  "password": "Password1!"
}
```

Returns a JWT token to be used as a Bearer token in subsequent requests.

#### `PATCH /api/changePassword` — requires auth

```json
{
  "oldPassword": "Password1!",
  "newPassword": "NewPassword2@"
}
```

---

### Bank Account

All routes require a valid JWT (`Authorization: Bearer <token>`).

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/me` | Get the authenticated user's profile |
| GET | `/api/users/` | List all bank accounts |
| GET | `/api/users/balance` | Get the authenticated user's balance |

---

### Transactions

All routes require a valid JWT.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/transaction/` | Create a new transaction |
| GET | `/api/transaction/research` | Search/filter transactions |

#### `POST /api/transaction/`

```json
{
  "amount": 100.00,
  "categoryid": "<mongo-object-id>",
  "description": "Monthly subscription",
  "iban": "IT60X0542811101000000123456"  // optional
}
```

#### `GET /api/transaction/research` — query params

| Param | Type | Required | Description |
|---|---|---|---|
| `num` | number | No | Limit number of results |
| `categoryId` | string (MongoId) | No | Filter by category |
| `startDate` | ISO date string | No | Filter from this date |
| `endDate` | ISO date string | No | Filter until this date |

---

### Transaction Types

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/transaction-type/` | No | List all transaction types |
| GET | `/api/transaction-type/:id` | No | Get a transaction type by ID |
| POST | `/api/transaction-type/` | Yes | Add a new transaction type |

#### `POST /api/transaction-type/`

```json
{
  "name": "Food & Groceries"
}
```

---

## Project Structure

```
src/
├── api/
│   ├── auth/                  # Register, login, change password
│   ├── bank-account/          # User profile and balance
│   ├── transaction/           # Create and query transactions
│   ├── transaction-type/      # Transaction categories
│   └── routes.ts              # Top-level API router
├── errors/                    # Custom error classes and handlers
├── utils/
│   ├── auth/
│   │   ├── jwt/               # JWT strategy (Passport)
│   │   └── local/             # Local strategy (Passport)
│   ├── authenticated.middleware.ts
│   ├── validation.middleware.ts
│   └── customs.validator.ts
├── app.ts                     # Express app setup
└── index.ts                   # Entry point (DB connect + server start)
```

---

## Deployment

The project deploys automatically to **Azure Web Apps** via GitHub Actions on every push to the `Development` branch.

The workflow (`.github/workflows/azure-webapps-node.yml`) handles:
1. Installing dependencies
2. Building TypeScript (`npm run build`)
3. Deploying the artifact to the `bbankapidaniel` Azure Web App

To configure deployment, add the `AZURE_WEBAPP_PUBLISH_PROFILE` secret to your GitHub repository settings.

---

## License

ISC
