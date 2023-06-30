import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/layout";

import {
  HeaderDashboard,
  HeaderLogHarian,
  HeaderProfil,
  HeaderRencanaKegiatan,
} from "./components/header-dashboard";
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
import DashboardBox from "./pages/dashboard-box";
import {
  ProfileBoxDPL,
  ProfileBoxDosen,
  ProfileBoxMahasiswa,
  ChangeProfileBoxMahasiswa,
  ChangeProfileBoxDosen,
  ChangeProfileBoxDPL,
} from "./pages/profile-box";
import {
  BreadcrumbProfile,
  BreadcrumbProfileUbah,
  BreadcrumbRencanaKegiatan,
  BreadcrumbRencanaKegiatanDetail,
} from "./components/breadcrumb";
import {
  RencanaKegiatanBox,
  RencanaKegiatanBoxDetailDPL,
  RencanaKegiatanBoxDetailDosen,
  RencanaKegiatanBoxDetailMahasiswa,
} from "./pages/rencana-kegiatan";

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
      <Flex>
        <ProfileLogo />
        <Spacer />
        <BreadcrumbProfile />
      </Flex>
      <ProfileBoxMahasiswa />
    </Box>
  );
}

function ProfileChange() {
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
      <Flex>
        <ProfileLogo />
        <Spacer />
        <BreadcrumbProfileUbah />
      </Flex>
      <ChangeProfileBoxMahasiswa />
    </Box>
  );
}

function RencanaKegiatan() {
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
      <HeaderRencanaKegiatan />
      <Flex>
        <RencanaKegiatanLogo />
        <Spacer />
        <BreadcrumbRencanaKegiatan />
      </Flex>
      <RencanaKegiatanBox />
    </Box>
  );
}

function RencanaKegiatanDetail() {
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
      <HeaderRencanaKegiatan />
      <Flex>
        <RencanaKegiatanLogo />
        <Spacer />
        <BreadcrumbRencanaKegiatanDetail />
      </Flex>
      <RencanaKegiatanBoxDetailMahasiswa />
    </Box>
  );
}

function LogHarian() {
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
      <HeaderLogHarian />
      <Flex>
        <LogHarianLogo />
        <Spacer />
        <BreadcrumbRencanaKegiatanDetail />
      </Flex>
      <RencanaKegiatanBoxDetailMahasiswa />
    </Box>
  );
}

export {
  Dashboard,
  Profile,
  ProfileChange,
  RencanaKegiatan,
  RencanaKegiatanDetail,
};
