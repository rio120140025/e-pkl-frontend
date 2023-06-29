import React from "react";
import { Box } from "@chakra-ui/layout";

import { HeaderDashboard, HeaderProfil } from "./components/header-dashboard";
import {
  DashboardLogo,
  ProfileLogo,
  RencanaKegiatanLogo,
  LogHarianLogo,
  KehadiranLogo,
  PenilaianLogo,
  KuisionerLogo,
} from "./components/description";
import HaloUser from "./components/halo-user";
import DashboardBox from "./components/dashboard-box";
import { ProfileBoxDPL, ProfileBoxDosen, ProfileBoxMahasiswa } from "./components/profile-box";

function Dashboard() {
  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundColor="#f4f8fa"
    >
      <HeaderDashboard />
      <DashboardLogo />
      <HaloUser />
      <DashboardBox />
    </Box>
  );
}

function Profile() {
  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundColor="#f4f8fa"
    >
      <HeaderProfil />
      <ProfileLogo />
      <ProfileBoxDPL />
    </Box>
  );
}

export { Dashboard, Profile };
