import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // let defaultVotes = {}
  //
  // for (let i = 0; i < anecdotes.length; i++) {
  //   defaultVotes[i] = 0;
  // }
  let defaultVotes = new Uint8Array(anecdotes.length)
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(defaultVotes)

  const addVote = () => {
    //
    // let newVote = {
    //   ...votes,
    // }
    // newVote[selected] += 1;
    // setVote(newVote)
    let newVote = [...votes]
    newVote[selected] += 1

    setVote(newVote)

  }
  const nextAnecdote = () => {
    const selection = Math.floor(Math.random() * anecdotes.length);
    setSelected(selection)
  }

  const findMax = () => {
    const maxVote = Math.max(...votes)
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] === maxVote) {
        return i
      }

    }

  }
  const mostVote = findMax();
  return (<>
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {votes[selected]}
      </p>
      <button onClick={nextAnecdote}>next</button>
      <button onClick={addVote}>vote</button>
    </div>

    <div>
      <h1>Anecdote with the most votes</h1>
      <p>
        {anecdotes[mostVote]}
      </p>
      <p>
        has {votes[mostVote]}
      </p>
    </div>
  </>
  )
}

export default App
