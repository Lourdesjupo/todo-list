import { Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {


  return (
    <>
      <Routes>
      <Route path='/' element={<Login />}></Route> 
      <Route path='/register' element={<Register />}></Route>
      <Route path='/tasks' element={<Main />}></Route>
      <Route  path="/addTask" element={<AddTask/>}></Route>
      <Route  path="/editTask/:id" element={<EditTask/>}></Route>
      </Routes>
    </>
  );
}

export default App;
