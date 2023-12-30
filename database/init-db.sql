CREATE EXTENSION pgcrypto;

CREATE TABLE IF NOT EXISTS questions(
    id SMALLINT PRIMARY KEY,
    content VARCHAR NOT NULL,
    correctAnswer CHAR(1) NOT NULL,
    type VARCHAR(11) NOT NULL,
    value SMALLINT NOT NULL,
    media VARCHAR,
    "A" VARCHAR,
    "B" VARCHAR,
    "C" VARCHAR
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);

COPY questions FROM '/data-import/questions.txt' WITH DELIMITER '|';
COPY users FROM '/data-import/users.txt' WITH DELIMITER '|';