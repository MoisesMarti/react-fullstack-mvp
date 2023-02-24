import React from 'react'

const Blogs = ({blogs}) => {
  const handleClick = (id) => {
    console.log(`clicked on comment with ID of: ${id}`)
}

  return blogs.map((current) => (
   <h1
    key={current.id}
    onClick={() => handleClick(current.id)}>
        {current.blogs}
   </h1> 
  ))
}
 export default Blogs