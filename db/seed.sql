DROP TABLE IF EXISTS users;

CREATE TABLE users
(
id SERIAL PRIMARY KEY,
hash text,
email VARCHAR(80),
profile_pic text
);

SELECT * FROM users;