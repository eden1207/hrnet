//import '../styles/App.css';
import {Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import CurrentEmployee from './CurrentEmployee.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employee' element={<CurrentEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
