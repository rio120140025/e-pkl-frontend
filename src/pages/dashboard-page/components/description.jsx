import React from "react";
import { Box } from "@chakra-ui/layout";

import "./description.css";

import LogoDashboard from "../../../assets/icon-dashboard.svg";
import LogoProfile from "../../../assets/icon-profile.svg";
import LogoRencanaKegiatan from "../../../assets/icon-rencana-kegiatan.svg";
import LogoLogHarian from "../../../assets/icon-log-harian.svg";
import LogoKehadiran from "../../../assets/icon-kehadiran.svg";
import LogoPenilaian from "../../../assets/icon-penilaian-pkl.svg";
import LogoKuisioner from "../../../assets/icon-kuisioner.svg";

function DashboardLogo() {
  return (
    <div>
      <Box className="icon">
        <img className="homeVectorIcon" alt="Dashboard" src={LogoDashboard} />
      </Box>
      <p className="desc-1">Dashboard</p>
      <p className="desc-2">Sistem Informasi PKL Institut Teknologi Sumatera</p>
    </div>
  );
}
function ProfileLogo() {
  return (
    <div>
      <Box className="icon">
        <img className="homeVectorIcon" alt="Dashboard" src={LogoProfile} />
      </Box>
      <p className="desc-1">Profile</p>
      <p className="desc-2">Berfungsi untuk melengkapi data profil</p>
    </div>
  );
}
function RencanaKegiatanLogo() {
  return (
    <div>
      <Box className="icon">
        <img
          className="homeVectorIcon"
          alt="Dashboard"
          src={LogoRencanaKegiatan}
        />
      </Box>
      <p className="desc-1">Rencana Kegiatan</p>
      <p className="desc-2">
        Berfungsi untuk melihat rencana kegiatan mahasiswa PKL
      </p>
    </div>
  );
}
function LogHarianLogo() {
  return (
    <div>
      <Box className="icon">
        <img className="homeVectorIcon" alt="Dashboard" src={LogoLogHarian} />
      </Box>
      <p className="desc-1">Log Harian</p>
      <p className="desc-2">
        Berfungsi untuk melihat data log harian mahasiswa PKL
      </p>
    </div>
  );
}
function KehadiranLogo() {
  return (
    <div>
      <Box className="icon">
        <img className="homeVectorIcon" alt="Dashboard" src={LogoKehadiran} />
      </Box>
      <p className="desc-1">Kehadiran</p>
      <p className="desc-2">
        Berfungsi untuk melihat data kehadiran mahasiswa PKL
      </p>
    </div>
  );
}
function PenilaianLogo() {
  return (
    <div>
      <Box className="icon">
        <img className="homeVectorIcon" alt="Dashboard" src={LogoPenilaian} />
      </Box>
      <p className="desc-1">Penilaian PKL</p>
      <p className="desc-2">
        Berfungsi untuk melihat data penilaian mahasiswa PKL
      </p>
    </div>
  );
}
function KuisionerLogo() {
  return (
    <div>
      <Box className="icon">
        <img className="homeVectorIcon" alt="Dashboard" src={LogoKuisioner} />
      </Box>
      <p className="desc-1">Kuisioner</p>
      <p className="desc-2">Berfungsi untuk mengisi kuisioner PKL</p>
    </div>
  );
}

export {
  DashboardLogo,
  ProfileLogo,
  RencanaKegiatanLogo,
  LogHarianLogo,
  KehadiranLogo,
  PenilaianLogo,
  KuisionerLogo,
};
