import React from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
           <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        {/* <Route path='/signup' element={<Signup />} /> */}
        {/* <Route path="/homepage" >
          <Route index element={<Homepage/>} />
        </Route> */}
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
