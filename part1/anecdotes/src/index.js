import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(new Array(anecdotes.length).fill(0))
  const mostPopular = scores.indexOf(Math.max(...scores))

  const selectRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteForAnecdote = () => {
    const newScores = [...scores]
    newScores[selected] += 1
    setScores(newScores)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {scores[selected]} votes</div>
      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[mostPopular]}</div>
      <div>has {scores[mostPopular]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)