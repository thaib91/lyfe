CREATE TABLE users
(
id SERIAL PRIMARY KEY,
username VARCHAR(20),
email VARCHAR(80),
hash text,
profile_pic text,
skills text,
interests text
);

SELECT * FROM users;