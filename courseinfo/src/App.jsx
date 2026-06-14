


const Couese = (props) => {

  const { course } = props

  let total = 0
  course.parts.forEach(part => {
    total += part.exercise
  })

  

  return (
    <div>
      <h1>{course.name}</h1>
          <ul>
            {course.parts.map(item => (
              <p key={item.id}>
                {item.name} {item.exercise}
              </p>
            ))}
            <p>total of {total} exercise</p>
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
      },
      { name: 'Redux',
        exercise: 11, 
        id: 4
       }
    ]
  }
  return (
    
      <Couese  course={course}/>
    
  )
}

export default App