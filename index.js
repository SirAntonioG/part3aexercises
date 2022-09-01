require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const Person = require("./models/person");

app.get("/", (request, response) => {
  response.send("<h1>Phonebook backend</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

// app.get("/info", (request, response) => {
//   const date = new Date();
//   const total = persons.length;
//   response.send(
//     `<p>Phonebook has info for ${total} people <br /> ${date} </p>`
//   );
// });

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      response.status(404).end();
    });
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((p) => p.id !== id);

//   response.status(204).end();
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // const unique = persons.some((p) => p.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  }
  // if (unique) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
