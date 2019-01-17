DROP TABLE IF EXISTS users;

CREATE TABLE users
(
id SERIAL PRIMARY KEY,
hash text,
email VARCHAR(80),
profile_pic text
);

SELECT * FROM users;





DROP TABLE IF EXISTS interests;

CREATE TABLE interests
(
interests_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
user_interests text
);  

SELECT * FROM interests;




DROP TABLE IF EXISTS goals;

CREATE TABLE goals
(
goal_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
goal text,
date DATE 
);  

SELECT * FROM goals;
