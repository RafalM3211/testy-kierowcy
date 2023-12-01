CREATE TABLE IF NOT EXISTS questions(
    id SMALLINT PRIMARY KEY,
    correct_answer CHAR(1) NOT NULL,
    media VARCHAR,
    type VARCHAR(11) NOT NULL,
    value SMALLINT NOT NULL,
    A VARCHAR,
    B VARCHAR,
    C VARCHAR
);

COPY questions FROM '/data-import/db-data.txt' WITH DELIMITER ';';