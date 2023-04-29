const mongoose = require('mongoose');

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const url = `mongodb+srv://fullstack:${password}@cluster0.qgbmgmn.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: personName,
  number: personNumber
});

if (personName && personNumber) {
  person.save().then((response) => {
    console.log(
      `added ${response.name} number ${response.number} to phonebook`
    );
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  console.log('Phonebook: ');
  Person.find({}).then((persons) => {
    persons.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
}
