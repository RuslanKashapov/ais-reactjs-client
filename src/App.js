import React, { useState } from "react";
import HomePage from "./components/HomePage";
import UpdatePage from "./components/UpdatePage";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';



function App() {

  return (
    <BrowserRouter>
        <nav class="uk-navbar-container">
          <div class="uk-navbar-center">
            <ul class="uk-navbar-nav">
              <li><NavLink to="/">Calculate</NavLink></li>
              <li><NavLink to="/update">Update</NavLink></li>
            </ul>
          </div>
        </nav>
        <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/update' element={<UpdatePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;