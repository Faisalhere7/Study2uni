import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./Components/Nav";
import Home from "./Components/Home/Home";
import Universities from "./Components/Pages/Universities";

const App = () => {
  return (
    <Router>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/universities" element={<Universities/>}/>
      </Routes>
    </Router>
  );
};

export default App;
