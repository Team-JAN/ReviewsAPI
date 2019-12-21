\c sdc;

SELECT setval('reviews_id_seq'::regclass, (SELECT MAX(id) FROM reviews));
