UPDATE interests
SET user_interests = ${user_interests}
WHERE interests_id = ${interests_id}
AND user_id = ${user_id};

SELECT * FROM interests WHERE user_id = ${user_id}
ORDER BY interests_id DESC;