import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/layout";

import "./App.css";

import Login from "./components/login-page/login";
import {
  RoleRegister,
  RoleRegisterDPL,
  RoleRegisterDosen,
  RoleRegisterMahasiswa,
} from "./components/register-page/register";

import Dashboard from "./components/main-page/dashboard-page/dashboard";
import Profil from "./components/main-page/profil-page/profil";
import Logout from "./components/main-page/logout"
import ProfilUbah from "./components/main-page/profil-page/profile-ubah";
import RencanaKegiatan from "./components/main-page/rencana-kegiatan/rencana-kegiatan";
import RencanaKegiatanDetail from "./components/main-page/rencana-kegiatan/rencana-kegiatan-detail";


function App() {
  return (
    <BrowserRouter>
      <Box
      // height={"100vh"}
      // width={"100vw"}
      // w="100%"
      // bgRepeat="no-repeat"
      // backgroundPosition="center"
      // backgroundSize="cover"
      >
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
          <Route
            exact
            path="/dashboard"
            Component={Dashboard}
          />
          <Route
            exact
            path="/profile"
            Component={Profil}
          />
          <Route
            exact
            path="/profile"
            Component={Profil}
          />
          <Route
            exact
            path="/profile-ubah"
            Component={ProfilUbah}
          />
          <Route
            exact
            path="/rencana-kegiatan"
            Component={RencanaKegiatan}
          />
          <Route
            exact
            path="/rencana-kegiatan-detail"
            Component={RencanaKegiatanDetail}
          />
          <Route
            exact
            path="/logout"
            Component={Logout}
          />

        </Routes>


      </Box>
    </BrowserRouter>
  );
}

export default App;
