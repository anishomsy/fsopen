const Header = ({ course }) => {
  return (<h1>{course}</h1>);
}

// const Content = ({ part, exercises }) => {
//   return (<p>{part} {exercises}</p>)
// }

const Part = ({ part, exercises }) => {
  return (<p>{part} {exercises}</p>)

}


const Content = ({ parts }) => {

  // let rows = [];
  // parts.forEach(part => {
  //   rows.push(<Part part={part.name} exercises={part.exercises} />);
  // });
  //
  // return (<div>
  //   {rows}
  // </div>
  //
  return (<div>
    <Part part={parts[0].name} exercises={parts[0].exercises} />
    <Part part={parts[1].name} exercises={parts[1].exercises} />
    <Part part={parts[2].name} exercises={parts[2].exercises} />


  </div>
  );
}

const Total = ({ parts }) => {
  // let sum = 0;
  // parts.forEach(item => {
  //   sum += item.exercise
  // });
  // return (
  //
  //   <p>Number of exercises {sum}</p>
  //
  // );
  return (<p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>);
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14
  //
  return (
    <div>
      <Header course={course.name} />
      <Content parts={
        course.parts
      } />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
