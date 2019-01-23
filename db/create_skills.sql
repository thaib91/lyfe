INSERT INTO skillshare
(
user_id,
skills_posts,
years,
description,
img,
category
)

VALUES
(
${user_id},
${skills_posts},
${years},
${description},
${img},
${category}
);

SELECT * FROM skillshare;