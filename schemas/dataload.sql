-- Connect to DB
\c sdc;

-- Reviews
COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/alexanderho/HackReactor/sdc/Data/reviews.csv' DELIMITER ',' CSV HEADER;

-- Reviews Photos
COPY reviews_photos(id, review_id, url)
FROM '/Users/alexanderho/HackReactor/sdc/Data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

-- Characteristics
-- COPY characteristics(id, product_id, name)
-- FROM '/Users/alexanderho/HackReactor/sdc/Data/characteristics.csv' DELIMITER ',' CSV HEADER;

-- Characteristics_Reviews Join
COPY characteristics_reviews(id, characteristic_id, review_id, value)
FROM '/Users/alexanderho/HackReactor/sdc/Data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;


