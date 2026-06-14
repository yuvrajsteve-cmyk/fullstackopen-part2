import React from 'react'


const Couese = (props) => {

  const { course } = props

  

  return (
    <div>
      <h1>{course.name}</h1>
          <ul>
            {course.parts.map(item => (
              <li key={item.id}>
                {item.name} {item.exercise}
              </li>
            ))}
          </ul>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercise: 10,
      id: 1
      },
      {
        name: 'Using props to pass the data',
        exercise: 7,
        id: 2
      },
      {
        name: 'State of component',
        exercise: 14,
        id: 3
      }
    ]
  }
  return (
    
      <Couese  course={course}/>
    
  )
}

export default App