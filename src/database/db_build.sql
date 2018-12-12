BEGIN;

DROP TABLE IF EXISTS users, notes CASCADE;

CREATE TABLE users (
     id         SERIAL PRIMARY KEY,
     name       VARCHAR(255) NOT NULL,
     username  VARCHAR(255) NOT NULL,
     password   TEXT NOT NULL
);

CREATE TABLE notes (
     id         SERIAL PRIMARY KEY,
     user_id    INT REFERENCES users,
     content    TEXT NOT NULL
);

COMMIT;
