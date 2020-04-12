import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({val, text}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{val}</td>
      </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <>
        <p>No feedback gathered</p>
      </>
    )
  }

  const avg = (good - bad) / total
  const avgPos = good / total

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text='good' val={good} />
          <Statistic text='neutral' val={neutral} />
          <Statistic text='bad' val={bad} />
          <Statistic text='total' val={total} />
          <Statistic text='average' val={avg} />
          <Statistic text='positive' val={avgPos} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = () => setGood(good + 1)
  const incNeutral = () => setNeutral(neutral + 1)
  const incBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={incGood} text='good' />
      <Button handleClick={incNeutral} text='neutral' />
      <Button handleClick={incBad} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);