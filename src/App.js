import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './pages/NavBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ComponentList from "./pages/ComponentTable";
import ComponentInfo from "./pages/ComponentInfo";
import ComponentAddForm from "./pages/ComponentAddForm";
import ForumHome from "./pages/Forum/ForumHome";
import ForumTopic from "./pages/Forum/ForumTopic";
import Profile from "./pages/Profile";
import NotAutherized from "./pages/NotAutherized";

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/components/cpus" element={<ComponentList category={"CPU"} />} />
          <Route path='/components/graphic_cards' element={<ComponentList category={"GPU"} />} />
          <Route path='/components/motherboards' element={<ComponentList category={"Motherboard"} />} />
          <Route path='/components/memory' element={<ComponentList category={"RAM"} />} />
          <Route path='/component/:id' element={<ComponentInfo />} />
          <Route path='/component/add' element={<ComponentAddForm />} />
          <Route path='/component/edit/:id' element={<ComponentAddForm isEdit={true}/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forum' element={<ForumHome />} />
          <Route path='/forum/topic/:id' element={<ForumTopic />} />
          <Route path='/unauthorized' element={<NotAutherized />} />
          <Route path='*' element={<NotFound />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
