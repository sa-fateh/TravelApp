-- PostgreSQL schema for Travel Guide Web Application
CREATE TYPE user_role AS ENUM ('visitor', 'user', 'business_owner', 'tourist_agency', 'admin');
CREATE TYPE business_type AS ENUM ('hotel', 'restaurant');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wilayas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) UNIQUE NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE landmarks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(100) NOT NULL,
  location VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  wilaya_id INT REFERENCES wilayas(id) ON DELETE CASCADE
);

CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  type business_type NOT NULL,
  address VARCHAR(220) NOT NULL,
  contact VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  is_approved BOOLEAN DEFAULT FALSE,
  wilaya_id INT REFERENCES wilayas(id) ON DELETE CASCADE,
  owner_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  status reservation_status DEFAULT 'pending',
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  business_id INT REFERENCES businesses(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  comment TEXT NOT NULL,
  response TEXT,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  business_id INT REFERENCES businesses(id) ON DELETE CASCADE
);

CREATE TABLE transport_agencies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  contact VARCHAR(120) NOT NULL,
  services TEXT NOT NULL,
  owner_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE house_rentals (
  id SERIAL PRIMARY KEY,
  address VARCHAR(220) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  contact VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);
