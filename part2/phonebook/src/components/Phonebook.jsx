export function Persons({ persons, handleDelete }) {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        );
      })}
    </ul>
  );
}

export function Person({ person, handleDelete }) {
  const handleClick = (id) => {
    return handleDelete(id);
  };
  return (
    <li>
      {person.name} - {person.number}
      <button onClick={() => handleClick(person.id)}>Delete</button>
    </li>
  );
}

export function Filter({ value, handleChange }) {
  return (
    <div>
      filter shown with
      <input name="filter" value={value} onChange={handleChange} />
    </div>
  );
}

export function PersonsForm({ values, handleChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input name="name" value={values.name} onChange={handleChange} />
      </div>
      <div>
        number:{" "}
        <input name="number" value={values.number} onChange={handleChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export function Notification({ message }) {
  if (message === null) {
    return null;
  }
  return (
    <div
      className={
        message.type === "error" ? "notification-error" : "notification-success"
      }
    >
      {message.content}
    </div>
  );
}
