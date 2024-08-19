import './App.css'
import './LogInPage/LogIn'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import LogIn from './LogInPage/LogIn';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Navigate replace to={`/login`} />
        } />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
