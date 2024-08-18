export function Persons({ persons }) {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        );
      })}
    </ul>
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
