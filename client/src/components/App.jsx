import React from 'react';
import Navbar from "./navbar/Navbar";
import '../css/app.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./registration/Registration";

function App() {
  return (
      <BrowserRouter>
          <div className='app'>
              <Navbar/>
              <div className="wrap">
			 	  <Registration/>			{/* ?????????????????? */}
                  <Routes>
                      <Route path="/registration" component={Registration}/>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;