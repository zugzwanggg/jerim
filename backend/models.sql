CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    google_id TEXT UNIQUE,
    telegram_id TEXT UNIQUE
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  user_id INT,
  lat NUMERIC(9, 6),
  lng NUMERIC(9, 6),
  comment VARCHAR(300),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES users(id),
);

CREATE TABLE picked_litters (
  id SERIAL PRIMARY KEY,
  user_id INT,
  lat NUMERIC(9, 6),
  lng NUMERIC(9, 6),
  image TEXT,
  brand VARCHAR(200),
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  user_id INT,
  lat NUMERIC(9, 6),
  lng NUMERIC(9, 6),
  image TEXT,
  comment VARCHAR(300),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE allowed_tree_locations (
  id SERIAL PRIMARY KEY,
  user_id INT,
  lat NUMERIC(9, 6),
  lng NUMERIC(9, 6),
  picture TEXT,
  comment VARCHAR(300),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);