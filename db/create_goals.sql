INSERT INTO goals
(
goal,
-- date,
user_id
)
VALUES 
( 
${goal},
-- ${date},
${user_id}
);

SELECT * FROM goals
WHERE user_id = ${user_id}
ORDER BY goal_id desc;