-- Connect to DB
\c sdc;

-- products index
CREATE INDEX product_index ON reviews (product_id);

-- reviews photos index
CREATE INDEX photo_index ON reviews_photos (review_id);

-- characteristics name index
CREATE INDEX characteristics_product_index ON characteristics (product_id);

--characteristics_id index
CREATE INDEX characteristics_id_index ON characteristics_reviews (characteristic_id);