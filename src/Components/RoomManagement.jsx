import { Plus } from 'lucide-react'
import React from 'react'

const RoomManagement = () => {
  return (
    <div className='min-h-[80vh]'>
    <center><h1 className='font-bold text-[50px] mx-auto' style={{backgroundColor:"grey"}} >This is dashboard for room management</h1>
    <div className='flex gap-4 items-center flex-col' style={{backgroundColor:"beige",width:"300px"}} >
        <p>Total no of rooms :</p>
        <p>Rooms which are oprational :</p>
    <p>rooms which are non oprational :</p>
        <button className='w-[70%] gap-4 flex flex-row bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            Add a new Patient 
           <Plus/>
            </button>
    </div></center>
    <div >
      <label for="beds">Sort rooms by opratibility:</label>
<select id="beds" name="beds">
<option value="occupied">oprational</option>
<option value="Unoccupied">non oprational</option>
<option value="All">All</option>
</select>
    </div>
</div>
  )
}

export default RoomManagement