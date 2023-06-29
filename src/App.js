import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/layout";

import "./App.css";

import Login from "./pages/login-page/login";
import {
  RoleRegister,
  RoleRegisterDPL,
  RoleRegisterDosen,
  RoleRegisterMahasiswa,
} from "./pages/register-page/register";
import { Dashboard, Profile } from "./pages/dashboard-page/dashboard"

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/register" Component={RoleRegister} />
          <Route
            exact
            path="/register-Mahasiswa"
            Component={RoleRegisterMahasiswa}
          />
          <Route exact path="/register-Dosen" Component={RoleRegisterDosen} />
          <Route
            exact
            path="/register-Dosen Pembimbing"
            Component={RoleRegisterDPL}
          />
          <Route exact path="/dashboard" Component={Dashboard} />
          <Route exact path="/profile" Component={Profile} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
