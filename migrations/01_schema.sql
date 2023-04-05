DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(127) NOT NULL,
  email VARCHAR(127) NOT NULL,
  password VARCHAR(127) NOT NULL
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  
  title VARCHAR(127) NOT NULL,
  description TEXT,
  cost_per_night MONEY DEFAULT 0,
  parking_spaces SMALLINT DEFAULT 0,
  num_of_bathrooms SMALLINT DEFAULT 0,
  num_of_bedrooms SMALLINT DEFAULT 0,

  thumbnail_url VARCHAR(127),
  cover_photo_url VARCHAR(127),
  
  country VARCHAR(127),
  province VARCHAR(127),
  city VARCHAR(127),
  street VARCHAR(127),
  postal_code VARCHAR(127),
  
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL,
  message TEXT
);