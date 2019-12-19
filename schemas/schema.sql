CREATE DATABASE sdc;
\c sdc;
CREATE TABLE reviews (
    id serial PRIMARY KEY,
    product_id INT NOT NULL,
    rating SMALLINT NOT NULL,
    date DATE NOT NULL,
    summary VARCHAR(60) NOT NULL,
    body VARCHAR(1000),
    recommend BOOLEAN NOT NULL,
    reported BOOLEAN NOT NULL,
    reviewer_name VARCHAR(60) NOT NULL,
    reviewer_email VARCHAR(60) NOT NULL,
    response VARCHAR(1000),
    helpfulness SMALLINT NOT NULL
);

CREATE TABLE reviews_photos (
    id serial PRIMARY KEY,
    review_id INT NOT NULL,
    url VARCHAR(500),
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
    id serial PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(8)    
);

CREATE TABLE characteristics_reviews (
    id serial PRIMARY KEY,
    characteristic_id INT NOT NULL,
    review_id INT NOT NULL,
    value SMALLINT NOT NULL CONSTRAINT star_bounds CHECK (value < 6 AND value > 0),
    FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);
