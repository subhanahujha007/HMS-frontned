
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BedManagement from './Components/BedManagement';
import PatientManagement from './Components/PatientManagement';
import RoomManagement from './Components/RoomManagement';
import Landing from "./Components/Landing.jsx"
import './index.css'; 
import Navbar from "./Components/Navbar.jsx"
import Footer from './Components/Footer.jsx';
import Login from './Auth/Login.jsx';
import SignUp from './Auth/Signup.jsx';
import Notfound from './Components/Notfound.jsx';
import Addbeds from './AddingData/Addbeds.jsx';
import EditRoom from './Edit/Editroom.jsx';
import Addrooms from './AddingData/Addrooms.jsx';
import Addpatient from './AddingData/Addpatient.jsx';
import EditBed from './Edit/Editbeds.jsx';
import EditPatient from './Edit/Editpatient.jsx';
function App() {
  return (
    <Router>
      <Navbar/>
    <Routes>
    <Route path="/" element={<Landing/>} /> 
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="*" element={<Notfound />} />
    
     
      <Route path="/editbed/:id" element={<EditBed/>}/>
      <Route path="/edit-patient/:id" element={<EditPatient/>}/>
      <Route path="/editroom/:id" element={<EditRoom />} />
      <Route path="/bed-management" element={<BedManagement />} />
      <Route path="/patient-management" element={<PatientManagement />} />
      <Route path="/room-management" element={<RoomManagement />} />
     
      <Route path='/addbeds' element={<Addbeds/>}/>
      <Route path='/addroom' element={<Addrooms/>}/>
      <Route path='/addpatient' element={<Addpatient/>}/>
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
