SELECT * FROM goals
WHERE user_id = ${user_id}
ORDER BY goal_id DESC;