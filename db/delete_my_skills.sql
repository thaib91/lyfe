DELETE FROM skillshare

WHERE skills_id = ${skills_id};
 
SELECT * FROM skillshare
WHERE user_id = ${user_id}
ORDER BY skills_id DESC;