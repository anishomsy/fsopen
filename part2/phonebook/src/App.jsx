import { useEffect, useState } from "react";
import {
  Filter,
  Notification,
  Persons,
  PersonsForm,
} from "./components/Phonebook";
import phonebookService from "./services/phonebook";
const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456", id: 1 },
    // { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    filter: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  function Notify(message) {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }

  function addNewName(e) {
    e.preventDefault();

    // check if user in the phonebook and return early
    const inPhonebook = persons.find((person) => formData.name === person.name);

    if (inPhonebook) {
      // chech if the number are the same first to return early
      if (inPhonebook.number === formData.number) {
        return alert(`${formData.name} is already added to phonebook!`);
      }
      // the number are not the same
      const allow = confirm(
        `${formData.name} is already added to phonebook, replace the old number with the new one?`,
      );

      //return early if no
      if (allow == false) {
        return;
      }
      const newObject = { ...inPhonebook, number: formData.number };

      phonebookService.update(inPhonebook.id, newObject).then((data) => {
        Notify({
          content: `${data.name} number was updated!`,
          type: "success",
        });

        setPersons(
          persons.map((p) => {
            return p.id !== data.id ? p : data;
          }),
        );
      });

      const newFormChange = {
        name: "",
        number: "",
        filter: "",
      };
      setFormData(newFormChange);
      return;
    }

    // create newuser
    const newNameObject = {
      // id: String(persons.length + 1),
      name: formData.name,
      number: formData.number,
    };

    phonebookService
      .create(newNameObject)
      .then((data) => {
        Notify({
          content: `${data.name} was added!`,
          type: "success",
        });
        setPersons(persons.concat(data));
        const newFormChange = {
          name: "",
          number: "",
          filter: "",
        };
        setFormData(newFormChange);
      })
      .catch((error) => {
        return Notify({
          content: error.response.data.error,
          type: "error",
        });
        // console.log(error.response.data.error);
      });
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

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const allow = confirm(`Are you sure you want to delete ${person.name}!`);
    if (allow === false) {
      return;
    }

    phonebookService
      .remove(id)
      .then((data) => {
        // Error Messages
        Notify({
          content: `${data.name} was deleted!`,
          type: "success",
        });

        setPersons(
          persons.filter((p) => {
            return p.id !== data.id;
          }),
        );
      })
      .catch((error) => {
        Notify({
          content: `${person.name} was already deleted!`,
          type: "error",
        });
        setPersons(persons.filter((p) => p.id !== person.id));
      });
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
      <Notification message={errorMessage} />
      <Filter value={formData.filter} handleChange={handleChange} />
      <br />
      <h1>Add new</h1>
      <PersonsForm
        values={formData}
        handleChange={handleChange}
        onSubmit={addNewName}
      />
      <h2>Numbers</h2>
      <Persons persons={showFilter} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
