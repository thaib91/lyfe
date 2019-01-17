SELECT users.id,interests.user_id, interests.user_interests, interests.interests_id

FROM users 
INNER JOIN interests ON interests.user_id = users.id
WHERE users.id = ${user_id}
ORDER BY interests_id DESC;
