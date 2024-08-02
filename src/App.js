
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
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
import Addrooms from './AddingData/Addrooms.jsx';
import Addpatient from './AddingData/Addpatient.jsx';
function App() {
  return (
    <Router>
      <Navbar/>
    <Routes>
    <Route path="/" element={<Landing/>} /> 
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/bed-management" element={<BedManagement />} />
      <Route path="/patient-management" element={<PatientManagement />} />
      <Route path="/room-management" element={<RoomManagement />} />
      <Route path="*" element={<Notfound />} />
      <Route path='/addbeds' element={<Addbeds/>}/>
      <Route path='/addroom' element={<Addrooms/>}/>
      <Route path='/addpatient' element={<Addpatient/>}/>
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
