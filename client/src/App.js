import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App