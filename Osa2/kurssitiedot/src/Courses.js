const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name} />
        {props.course.parts.map(part => <Content name={part.name} exercises={part.exercises} key={part.id}/>)}
        <Total info={props.course} />
      </div>
    )
}

const Header = (props) => {
  return(
    <div>
      <h1> {props.name} </h1>
    </div>
  )
  }

const Part = (props) =>
  <p> {props.name} {props.exercises} </p>

const Content = (props) =>
  <Part name={props.name} exercises={props.exercises} />

const Total = (props) => {
  const num_of_exercises = props.info.parts.reduce((cumulative, part) => cumulative + part.exercises, 0);
  return (
    <b> total of {num_of_exercises} exercises </b>
  )
}

export default Course;