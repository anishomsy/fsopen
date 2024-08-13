import { useState } from 'react'


const Statistics = ({ feedback }) => {
  return (<>
    <table>
      <tbody>
        <tr><StatisticLine text="good" value={feedback.good} /></tr>
        <tr><StatisticLine text='neutral' value={feedback.neutral} /></tr>
        <tr><StatisticLine text="bad" value={feedback.bad} /></tr>
        <tr><StatisticLine text="all" value={feedback.length} /></tr>
        <tr><StatisticLine text="average" value={(feedback.good - feedback.bad) / feedback.length} /></tr>
        <tr><StatisticLine text="positive" value={((feedback.good) / feedback.length) * 100} type='%' /></tr>
      </tbody>
    </table>
  </>
  )
}

const Button = ({ value, handleClick }) => {
  return (<button onClick={handleClick}>{value}</button>)
}

const StatisticLine = ({ text, value, type = "" }) => {
  return (<td>{text} {value} {type}</td>);
}

function App() {

  const [feedback, setFeedback] = useState({
    length: 0,
    bad: 0,
    good: 0,
    neutral: 0
  })

  const updateGood = () => {
    const newFeedback = {
      ...feedback,
      length: feedback.length + 1,
      good: feedback.good + 1,
    }
    setFeedback(newFeedback);
  }
  const updateBad = () => {
    const newFeedback = {
      ...feedback,
      length: feedback.length + 1,
      bad: feedback.bad + 1,
    }
    setFeedback(newFeedback);
  }
  const updateNeutral = () => {
    const newFeedback = {
      ...feedback,
      length: feedback.length + 1,
      neutral: feedback.neutral + 1,
    }
    setFeedback(newFeedback);
  }


  // let statistics = []
  // for (const [key, value] of Object.entries(feedback)) {
  //   statistics.push(<p>{key} {value}</p>);
  //
  // }

  return (
    <>
      <h1>Give feedback</h1>
      <Button value="good" handleClick={updateGood} />
      <Button value="neutral" handleClick={updateNeutral} />
      <Button value="bad" handleClick={updateBad} />
      <br />
      <br />
      <h1>Statistics</h1>
      {feedback.length === 0 ? <p>No feedback given</p> : <Statistics feedback={feedback} />}
    </>
  )
}

export default App
