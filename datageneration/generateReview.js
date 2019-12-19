const faker = require('faker');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const lorem = new LoremIpsum ({
    sentencesPerParagraph: {
        max: 4,
        min: 2
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
});

module.exports = () => {
    var dt = new Date();
    date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    return [
        Math.floor(Math.random() * 4 + 1),
        Math.floor(Math.random() * 5 + 1),
        date,
        lorem.generateSentences(1),
        lorem.generateParagraphs(1),
        Math.floor(Math.random() * 2),
        0,
        faker.name.findName(),
        faker.internet.email(),
        null,
        0
    ];
};

//Reviews Schema
// id serial PRIMARY KEY,
// product_id INT NOT NULL, //Between 1 and 4
// rating SMALLINT NOT NULL, //Between 1 and 5
// date DATE NOT NULL, //
// summary VARCHAR(60) NOT NULL,
// body VARCHAR(1000),
// recommend BOOLEAN NOT NULL,
// reported BOOLEAN NOT NULL,
// reviewer_name VARCHAR(60) NOT NULL,
// reviewer_email VARCHAR(60) NOT NULL,
// response VARCHAR(1000),
// helpfulness SMALLINT NOT NULL
