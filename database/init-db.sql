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

COPY questions FROM '/data-import/db-data.txt' WITH DELIMITER '|';