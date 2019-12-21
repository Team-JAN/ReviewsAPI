\c sdc;
-- reviews
SELECT setval('reviews_id_seq'::regclass, (SELECT MAX(id) FROM reviews));

-- reviews photos
SELECT setval('reviews_photos_id_seq'::regclass, (SELECT MAX(id) FROM reviews_photos));

-- reviews characteistics
SELECT setval('characteristics_reviews_id_seq'::regclass, (SELECT MAX(id) FROM characteristics_reviews));
