# Travel Guide Web Application

A full-stack tourism platform for exploring wilayas, landmarks, hotels, restaurants, transportation services, and reservations.

## Tech Stack
- **Backend:** Node.js + Express + Sequelize (MVC)
- **Frontend:** React + Vite
- **Database:** PostgreSQL
- **Auth:** JWT + role-based access control

## Features by Role
- **Visitor:** browse wilayas, landmarks, businesses, transport, and reviews.
- **Registered User:** register/login, make reservations, leave reviews, upload house rentals, update profile.
- **Business Owner:** create/manage hotel/restaurant profile, manage reservations, respond to reviews.
- **Tourist Agency:** publish/update transport services.
- **Admin:** manage users, approve businesses, moderate landmarks/wilayas.

## Project Structure
```
.
├── backend
│   ├── sql
│   │   ├── schema.sql
│   │   └── seed.sql
│   └── src
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── models
│       ├── routes
│       └── seeders
└── frontend
    └── src
        ├── api
        ├── components
        ├── context
        ├── pages
        └── styles
```

## Environment Variables
Create `backend/.env`:
```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=travel_guide
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=replace-with-strong-secret
```

Optional for frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:4000/api
```

## Installation & Run
```bash
npm install
npm run dev
```
This starts backend on `http://localhost:4000` and frontend on `http://localhost:5173`.

## API Highlights
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/wilayas`
- `GET /api/businesses`
- `POST /api/reservations`
- `POST /api/reviews`
- `PUT /api/businesses/:id`
- `DELETE /api/admin/users/:id`

## Database Schema
See:
- `backend/sql/schema.sql`
- `backend/sql/seed.sql`

## ER Diagram (Text)
```
User (1) ───< Business >─── (1) Wilaya
User (1) ───< Reservation >─── (1) Business
User (1) ───< Review >──────── (1) Business
Wilaya (1) ───< Landmark
User (1) ───< TransportAgency
User (1) ───< HouseRental
```

## Demo Seed Accounts
Password for all: `Password123!`
- `admin@travel.com` (admin)
- `user@travel.com` (user)
- `owner@travel.com` (business_owner)
- `agency@travel.com` (tourist_agency)

## Security & Validation
- Password hashing with bcrypt.
- JWT authentication middleware.
- Role-based route guards.
- Input validation via `express-validator`.
- Centralized error handling middleware.
