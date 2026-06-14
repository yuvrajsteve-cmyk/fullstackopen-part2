import React from "react"


const Course = (props) => {
  const { course } = props
  console.log(props)

  const total = course.parts.reduce((sum , part) =>{
    console.log(`Whats happning here:`, sum, part)
    return sum + part.exercises
  }, 0)

  return (
    <div>
         
         <div>
          <h2>{course.name}</h2>
          {course.parts.map(part => (
            <p style={{fontWeight: 'bold'}} 
             key={part.id}>{part.name} - {part.exercises}</p>
          ))}
          <h3>total of {total} exercises</h3>
         </div>
    </div>
  )
}

export default Course