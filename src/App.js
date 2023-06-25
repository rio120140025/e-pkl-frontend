import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login-page/login";
import Register from './components/Register-page/Register'
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
