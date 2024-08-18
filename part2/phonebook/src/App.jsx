import { useState } from "react";
import { Filter, Persons, PersonsForm } from "./components/Phonebook";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    filter: "",
  });

  function addNewName(e) {
    e.preventDefault();

    // check if user in the phonebook and return early
    const inPhonebook = persons.find((person) => formData.name === person.name);

    if (inPhonebook) {
      return alert(`${formData.name} is already added to phonebook!`);
    }

    // create newuser
    const newNameObject = {
      id: String(persons.length + 1),
      name: formData.name,
      number: formData.number,
    };

    setPersons(persons.concat(newNameObject));
    const newFormChange = {
      name: "",
      number: "",
      filter: "",
    };
    setFormData(newFormChange);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newFormChange = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormChange);
  };
  // convert the strings toLowerCase() for easier comperasion and filter
  const showFilter =
    formData.filter === ""
      ? persons
      : persons.filter((person) => {
          return person.name
            .toLowerCase()
            .includes(formData.filter.toLowerCase());
        });

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={formData.filter} handleChange={handleChange} />
      <br />
      <h1>Add new</h1>
      <PersonsForm
        values={formData}
        handleChange={handleChange}
        onSubmit={addNewName}
      />
      <h2>Numbers</h2>
      <Persons persons={showFilter} />
    </div>
  );
};

export default App;
