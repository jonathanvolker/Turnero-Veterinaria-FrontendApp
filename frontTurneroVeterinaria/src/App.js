import React from "react";
import './App.css';
import {
  BrowserRouter,
  Routes, 
  Switch,
  Route,
  Link
} from "react-router-dom";

import Landing from "./components/Landing"
import Form from "./components/Form"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/nuevamascota" element={<Form/>}/>
          <Route path="/" element={<Landing/>}/>
         </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
