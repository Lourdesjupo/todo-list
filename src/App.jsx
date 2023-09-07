import { Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import AddTask from "./pages/AddTask";


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Main />}>
      </Route>
        <Route  path="/addTask" element={<AddTask/>}></Route>
      </Routes>
    </>
  );
}

export default App;
