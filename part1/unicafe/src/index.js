import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return (
      <h1>
        {text}
      </h1>
  )
}

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Stat = ({text, value }) => {
  if (text === 'positive') {
    return (
      <p>
        {text} {value}%
      </p>
    )
  }
  return (
    <p>
      {text} {value}
    </p>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const haddleGoodClick = () => {
    setAll(all + 1);
    setGood(good + 1);
  }
  const haddleBadClick = () => {
    setAll(all + 1);
    setBad(bad + 1);
  }
  const haddleNeutralClick = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={haddleGoodClick} text='good'/>
      <Button onClick={haddleNeutralClick} text='neutral'/>
      <Button onClick={haddleBadClick} text='bad'/>
      <Header text='statistics'/>
      <Stat text='good' value={good}/>
      <Stat text='neutral' value={neutral}/>
      <Stat text='bad' value={bad}/>
      <Stat text='all' value={all}/>
      <Stat text='average' value={(good * 1 + bad * (-1)) / all}/>
      <Stat text='positive' value={(good * 100) / all }/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)