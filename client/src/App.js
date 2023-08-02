import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const App = () => {
  const [formType,setFormType]=React.useState("login")
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login formType={formType} setFormType={setFormType} />}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App