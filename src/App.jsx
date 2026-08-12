import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </main>
  )
}

export default App
