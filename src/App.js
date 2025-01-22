import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './pages/Layout';
import Home from './pages/Home';
import Cpus from './pages/cpu/Cpus';
import CpuForm from './pages/cpu/CpuForm';
import GraphicCards from './pages/gpu/GraphicCards';
import Motherboards from './pages/Motherboards';
import Memory from './pages/Memory';
import axios from './AxiosConfig';
import NotFound from './pages/NotFound';
import CpuInfo from "./pages/cpu/CpuInfo";

function App() {

  const onSubmit = async (cpuData) => {
    try {
        const response = await axios.post('/cpus/add', cpuData);
        console.log('Cpu added successfully', response.data);
    } catch (error) {
        console.error('Error adding cpu: ', error)
    }
}

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/cpus/all' element={<Cpus />} />
          <Route path='/cpus/:id' element={<CpuInfo />} />
          <Route path='/cpus/add' element={<CpuForm onSubmit={onSubmit}/>} />
          <Route path='/graphic cards/all' element={<GraphicCards />} />
          <Route path='/motherboards/all' element={<Motherboards />} />
          <Route path='/memory/all' element={<Memory />} />
          <Route path='*' element={<NotFound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
