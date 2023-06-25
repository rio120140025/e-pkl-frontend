import Login from "./components/login-page/login";
import { RoleRegister, RoleRegisterDPL, RoleRegisterDosen, RoleRegisterMahasiswa } from "./components/register-page/register";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/layout";

function App() {
  return (
    <BrowserRouter>
      <Box
        bgImage={"background.jpg"}
        height={"100vh"}
        width={"100vw"}
        w="100%"
        bgRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/register" Component={RoleRegister} />
          <Route exact path="/register-Mahasiswa" Component={RoleRegisterMahasiswa} />
          <Route exact path="/register-Dosen" Component={RoleRegisterDosen} />
          <Route exact path="/register-Dosen Pembimbing" Component={RoleRegisterDPL} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
