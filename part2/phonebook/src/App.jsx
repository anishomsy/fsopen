import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPhonebook, setFilterPhonebook] = useState("");

  function addNewName(e) {
    e.preventDefault();

    // check if user in the phonebook and return early
    const inPhonebook = persons.find((person) => newName === person.name);
    if (inPhonebook) {
      return alert(`${newName} is already added to phonebook!`);
    }

    // create newuser
    const newNameObject = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newNameObject));
    setNewName("");
    setNewNumber("");
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterPhonebookChange = (e) => {
    setFilterPhonebook(e.target.value);
  };

  // convert the strings toLowerCase() for easier comperasion and filter
  const showFilter =
    filterPhonebook === ""
      ? persons
      : persons.filter((person) => {
          return person.name
            .toLowerCase()
            .includes(filterPhonebook.toLowerCase());
        });

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={filterPhonebook} onChange={handleFilterPhonebookChange} />
      </div>
      <br />
      <h1>Add new</h1>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {showFilter.map((person) => {
          return (
            <li key={person.id}>
              {person.name} - {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
