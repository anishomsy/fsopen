import { useState } from 'react'


const Statistics = ({ feedback }) => {
  return (
    <div>
      <p>good {feedback.good}</p>
      <p>neutral {feedback.neutral}</p>
      <p>bad {feedback.bad}</p>
      <p>all {feedback.length}</p>
      <p>average {(feedback.good - feedback.bad) / feedback.length}</p>
      <p>positive {((feedback.good) / feedback.length) * 100}%</p>
    </div>
  )
}

const Button = ({ value, updateFeedback }) => {
  return (<button onClick={updateFeedback}>{value}</button>)
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
      <Button value="good" onClick={updateGood} />
      <Button value="neutral" />
      <Button value="bad" />
      {/* <button onClick={updateGood} >good</button> */}
      {/* <button onClick={updateNeutral} >neutral</button> */}
      {/* <button onClick={updateBad} >bad</button> */}
      <br />
      <br />
      {feedback.length === 0 ? <p>No feedback given</p> : <Statistics feedback={feedback} />}
    </>
  )
}

export default App
