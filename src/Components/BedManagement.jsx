import React from 'react'
import {Plus} from "lucide-react"
const BedManagement = () => {
  return (
    <div className='min-h-[80vh]'>
        <center><h1 className='font-bold text-[50px] mx-auto' style={{backgroundColor:"palegreen"}} >This is dashboard for bed management</h1>
        <div className='flex gap-4 items-center flex-col' style={{backgroundColor:"beige",width:"300px"}} >
            <p>Total no of beds :</p>
            <p>Beds occupied :</p>
            <p>Empty beds :</p>
            <button className='w-[70%] gap-4 flex flex-row bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                create a new bed 
               <Plus/>
                </button>
        </div></center>
        <div >
          <label for="beds">Sort beds by prefrence:</label>
<select id="beds" name="beds">
  <option value="occupied">Occupied</option>
  <option value="Unoccupied">Unoccupied</option>
  <option value="All">All</option>
</select>
        </div>
    </div>
  )
}

export default BedManagement