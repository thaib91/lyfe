SELECT * FROM goals
WHERE user_id = ${user_id}
ORDER BY goal_id DESC;


-- SELECT TO_CHAR(date, 'MM-DD-YYYY') as date, goal FROM goals
-- WHERE user_id = ${user_id}
-- ORDER BY goal_id DESC;