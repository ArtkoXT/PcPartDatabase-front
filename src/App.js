import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './pages/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ComponentList from "./pages/ComponentTable";
import ComponentInfo from "./pages/ComponentInfo";

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path='/cpus/all' element={<Cpus />} /> */}
          <Route path="/cpus/all" element={<ComponentList category={"CPU"} />} />
          <Route path='/graphic cards/all' element={<ComponentList category={"GPU"} />} />
          <Route path='/motherboards/all' element={<ComponentList category={"Motherboard"} />} />
          <Route path='/memory/all' element={<ComponentList category={"RAM"} />} />
          <Route path='/component/:id' element={<ComponentInfo />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
