import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './pages/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ComponentList from "./pages/ComponentTable";
import ComponentInfo from "./pages/ComponentInfo";
import ComponentAddForm from "./pages/ComponentAddForm";
import ForumHome from "./pages/ForumHome";

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
          <Route path='/component/add' element={<ComponentAddForm />} />
          <Route path='/component/edit/:id' element={<ComponentAddForm isEdit={true}/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forum' element={<ForumHome />} />
          <Route path='*' element={<NotFound />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
