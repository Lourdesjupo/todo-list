import { Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/login";


function App() {


  return (
    <>
      <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/' element={<Main />}></Route>
      <Route  path="/addTask" element={<AddTask/>}></Route>
      <Route  path="/editTask/:id" element={<EditTask/>}></Route>
      </Routes>
    </>
  );
}

export default App;
