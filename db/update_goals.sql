UPDATE goals
SET goal = ${goal}
WHERE goal_id = ${goal_id}
AND user_id = ${user_id};

SELECT * FROM goals WHERE user_id = ${user_id}
ORDER BY goals DESC;