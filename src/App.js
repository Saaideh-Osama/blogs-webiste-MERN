import './App.css';
import Login from './pages/login';
import Index from './pages/index';
import NavBar from './navBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterP from './pages/register';
import CreatePost from './pages/createPost';
function App() {
  return (<>
    <NavBar/>
      <BrowserRouter>
      <Routes>
          <Route index element={<Index/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<RegisterP/>}/>
          <Route path="/create" element={<CreatePost/>}/>
        
      </Routes>
    </BrowserRouter>
   
    </>
  );
}

export default App;
