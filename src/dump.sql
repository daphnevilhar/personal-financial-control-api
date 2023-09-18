CREATE DATABASE dindin;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    value INTEGER NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW(),
    categories_id INTEGER NOT NULL REFERENCES categories(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL
);
