INSERT INTO users
(
username,
email,
hash
)
VALUES 
(
${username},
${email},
${hash}
)

RETURNING *;
