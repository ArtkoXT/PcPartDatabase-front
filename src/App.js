import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Cpus from './pages/Cpus';
import GraphicCards from './pages/GraphicCards';
import Motherboards from './pages/Motherboards';
import Memory from './pages/Memory';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/cpus/all' element={<Cpus />} />
        <Route path='/graphic cards/all' element={<GraphicCards />} />
        <Route path='/motherboards/all' element={<Motherboards />} />
        <Route path='/memory/all' element={<Memory />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
