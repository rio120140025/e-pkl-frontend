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
import {
  Dashboard,
  Kehadiran,
  Kuisioner,
  LogHarian,
  LogHarianDetail,
  Penilaian,
  PenilaianDetail,
  Profile,
  ProfileChange,
  RencanaKegiatan,
  RencanaKegiatanDetail,
} from "./pages/dashboard-page/dashboard";

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
          <Route exact path="/profile/ubah" Component={ProfileChange} />

          <Route exact path="/rencana-kegiatan" Component={RencanaKegiatan} />
          <Route
            exact
            path="/rencana-kegiatan/detail"
            Component={RencanaKegiatanDetail}
          />

          <Route exact path="/log-harian" Component={LogHarian} />
          <Route exact path="/log-harian/detail" Component={LogHarianDetail} />

          <Route exact path="/kehadiran" Component={Kehadiran} />

          <Route exact path="/penilaian-pkl" Component={Penilaian} />

          <Route exact path="/kuisioner" Component={Kuisioner} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
