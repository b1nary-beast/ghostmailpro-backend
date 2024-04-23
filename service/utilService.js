// // const { faker } = require('@faker-js/faker');
// const { faker } = require('@faker-js/faker/locale/en');

// // Function to generate unique names
// const generateUniqueNames = (count) => {
//     let names = new Set();
//     while (names.size < count) {
//         const firstName = faker.person.firstName().toLowerCase();
//         const lastName = faker.person.lastName().toLowerCase();
//         const fullName = `${firstName}.${lastName}`;
//         names.add(fullName);
//     }
//     return Array.from(names);
// }

// module.exports = generateUniqueNames;