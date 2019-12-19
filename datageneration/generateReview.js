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
    return [
        Math.floor(Math.random() * 4 + 1),
        Math.floor(Math.random() * 5 + 1),
        new Date(),
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

