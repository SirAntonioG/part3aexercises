const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const nameData = process.argv[3];
const numberData = process.argv[4];

const url = `mongodb+srv://sirantoniog:${password}@cluster0.ap9bref.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 4) {
  mongoose.connect(url);
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: nameData,
        number: numberData,
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${nameData} number ${numberData} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
