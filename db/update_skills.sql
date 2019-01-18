UPDATE skillshare
SET 
skills_posts = ${skills_posts},
years = ${years},
description = ${description},
img = ${img}


WHERE skills_id = ${skills_id}
AND user_id = ${user_id};

SELECT * FROM skillshare WHERE user_id = ${user_id}
ORDER BY skills_id DESC;