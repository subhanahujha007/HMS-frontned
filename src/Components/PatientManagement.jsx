import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
const PatientManagement = () => {
  return (
    <div className='min-h-[80vh]'>
    <center><h1 className='font-bold text-[50px] mx-auto' style={{backgroundColor:"pink"}} >This is dashboard for patient management</h1>
    <div className='flex gap-4 items-center flex-col' style={{backgroundColor:"beige",width:"300px"}} >
        <p>Total no of patient :</p>
        <p>patient with Beds  :</p>
        <p>patient without beds:</p>
        <button className='w-[70%] gap-4 flex flex-row bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
         <Link to="/addpatient">Add a new Patient</Link>    
           <Plus/>
            </button>
    </div></center>
    <div >
      <label for="beds">Sort patient by beds avalibility:</label>
<select id="beds" name="beds">
<option value="occupied">Allocated</option>
<option value="Unoccupied">Waiting</option>
<option value="All">All</option>
</select>
    </div>
</div>
  )
}

export default PatientManagement