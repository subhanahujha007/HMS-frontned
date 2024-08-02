import React from 'react'
import { Link } from 'react-router-dom'
const Notfound = () => {
  return (
    <center className='min-h-[80vh] flex flex-col items-center justify-center'>
        <h1 className='text-bold text-[50px] ' >404 Not Found</h1>
       <Link to="/"><button className='underline'>Go back</button></Link> 
    </center>
  )
}

export default Notfound