//import '../styles/App.css';
import {Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Employee from './Employee.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employee' element={<Employee />} />
      </Routes>
    </div>
  );
}

export default App;
