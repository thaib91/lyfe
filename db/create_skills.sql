INSERT INTO skillshare
(
user_id,
skills_posts,
years,
description,
img
)

VALUES
(
${user_id},
${skills_posts},
${years},
${description},
${img}
);

SELECT * FROM skillshare;