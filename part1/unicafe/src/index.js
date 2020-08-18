import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ name, value, symbol }) => (
  <tr>
    <td>{name}</td>
    <td>{value} {symbol}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + (neutral * 0) + (bad * -1)
  const count = good + neutral + bad
  const average = (total / count) || 0
  const goodPercentage = (good / count * 100) || 0

  if (count === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <Statistic name='good' value={good} />
        <Statistic name='neutral' value={neutral} />
        <Statistic name='bad' value={bad} />
        <Statistic name='all' value={good + neutral + bad} />
        <Statistic name='average' value={average} />
        <Statistic name='positive' value={goodPercentage} symbol='%' />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const addGood = () => {setGood(good + 1)}
  const addNeutral = () => {setNeutral(neutral + 1)}
  const addBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addGood} text='good' />
      <Button handleClick={addNeutral} text='neutral' />
      <Button handleClick={addBad}  text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

