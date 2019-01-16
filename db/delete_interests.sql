DELETE FROM INTERESTS

WHERE interests_id = ${interests_id};

SELECT * FROM interests
WHERE user_id = ${id}