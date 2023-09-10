import React from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';

import './App.css';
import Signin from './pages/Signin';

function App() {
  return (
    <div className="App">
           <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin/>} />
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
