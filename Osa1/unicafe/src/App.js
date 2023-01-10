import { useState } from 'react'


const Title = () => {
  return (
    <div>
      <h1> Give feedback </h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.incrementValue}> {props.text} </button> 
    </div>
  )
}

const Average = function(good, bad, total) {
  const good_value = 1;
  const bad_value = -1; //values for calculating the average
  return (good * good_value + bad * bad_value) / total
}

const Positive = function (good, total) {
  return (good / total) * 100 + " %"
}

const StatisticLine = (props) => {
  return (
    <table>
      <tbody> 
        <tr>
        <td> {props.text} {props.value} </td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  const total = props.good+props.neutral+props.bad;
  const average = Average(props.good, props.bad, total)
  const positive = Positive(props.good, total);
  if (total === 0){
    return(
      <div> 
        <p> No feedback given </p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2> Statistics </h2>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </div>
    )
    }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title/>
      <Button incrementValue={incrementGood} text="good" /> 
      <Button incrementValue={incrementNeutral} text="neutral" /> 
      <Button incrementValue={incrementBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App