const faker = require('faker');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

// console.log(faker.name.findName());
// console.log(faker.internet.email());
// console.log(faker.internet.avatar());
// console.log(faker.lorem.paragraph());

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

// console.log(lorem.generateParagraphs(1));
console.log(faker.image.imageUrl());

// console.log(LoremIpsum());
