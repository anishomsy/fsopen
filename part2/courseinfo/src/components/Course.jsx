function Course({ course }) {
  return (<>
    <Header text={course.name} />
    <Content parts={course.parts} />



  </>);
}


export function Header({ text }) {
  return (<h1>{text}</h1>);
}

export function Content({ parts }) {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0);

  return (<>

    {
      parts.map((part) => {
        return (<Part key={part.id} part={part} />);
      })

    }
    <p><strong>total of {total} exercises</strong></p>


  </>);
}

export function Part({ part }) {
  return (<p>{part.name} {part.exercises}</p>);
}

export default Course;
