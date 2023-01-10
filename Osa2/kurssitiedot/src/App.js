import Course from "./Courses"

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        },
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'testi.js',
      id: 3,
      parts: [
        {
          name: 'Programming',
          exercises: 12,
          id: 1
        },
        {
          name: 'Debugging',
          exercises: 20,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((courses, key) => <Course key={key} course={courses} />)}
    </div>
  )
}

export default App