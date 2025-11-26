import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Universities from "./Components/Pages/Universities";
import UniversityDetails from "./Components/Pages/UniversityDetails";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import UnderGraduate from "./Components/Pages/Programs/UnderGraduate/UnderGraduate";
import Dashboard from "./Components/Dashboard";
import PostGraduate from "./Components/Pages/Programs/PostGraduate/PostGraduate";
import Phd from "./Components/Pages/Programs/PHD/Phd";
import Diploma from "./Components/Pages/Programs/Diploma/Diploma";
import Services from "./Components/Pages/Services/Services";
import About from "./Components/Pages/About/About";
import Contact from "./Components/Pages/Contact/Contact";

export default function App() {
  return (
    <Router>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:slug" element={<UniversityDetails />} />
        <Route path="/sign-in" element={<Login/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/undergraduate-bachelors-degree" element={<UnderGraduate/>}/>
<Route path="/dashboard-home" element={<Dashboard/>}/>
<Route path="/postgraduate-masters-degree" element={<PostGraduate/>}/>
<Route path="/phd-research" element ={<Phd/>}/>
<Route path="/diploma-certificate-courses" element={<Diploma/>}/>
<Route path="/services" element={<Services/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/contact" element={<Contact/>}/>
      </Routes>
    </Router>
  );
}
