import './App.css';
import {Route,Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo';
import AdminInfo from './pages/AdminInfo';
import  Confo from './pages/Confo';
import  Failed from './pages/Failed';
import AboutUs from './pages/Navbar_i/Aboutus';
import Benefits from './pages/Navbar_i/Benefits';
import Group1 from './pages/Female/Group1';
import Group2 from './pages/Female/Group2';
import Group3 from './pages/Female/Group3';
import Group4 from './pages/Male/Group4';
import Group5 from './pages/Male/Group5';
import Group6 from './pages/Male/Group6';
import Group7 from './pages/Group7';
import Group1a from './pages/Female/Group1a';  
import Group2a from './pages/Female/Group2a';
import Group3a from './pages/Female/Group3a';
import Group4a from './pages/Male/Group4a';
import Group5a from './pages/Male/Group5a';
import Group6a from './pages/Male/Group6a';
import Group7a from './pages/Group7a';





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/admininfo" element={<AdminInfo />} />
        <Route path="/confo" element={<Confo />} /> 
        <Route path="/failed" element={<Failed />} />  
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/group1" element={<Group1 />} />
        <Route path="/group2" element={<Group2 />} />
        <Route path="/group3" element={<Group3 />} />
        <Route path="/group4" element={<Group4 />} />
        <Route path="/group5" element={<Group5 />} />
        <Route path="/group6" element={<Group6 />} />
        <Route path="/group7" element={<Group7 />} />
        <Route path="/group1a" element={<Group1a />} />
        <Route path="/group2a" element={<Group2a />} />
        <Route path="/group3a" element={<Group3a />} />
        <Route path="/group4a" element={<Group4a />} />
        <Route path="/group5a" element={<Group5a />} />
        <Route path="/group6a" element={<Group6a />} />
        <Route path="/group7a" element={<Group7a />} />


      </Routes>
    </div>
  );
}

export default App;                           
