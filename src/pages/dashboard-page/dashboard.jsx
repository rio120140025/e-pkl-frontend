import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/layout";

import {
  HeaderDashboard,
  HeaderKehadiran,
  HeaderKuisioner,
  HeaderLogHarian,
  HeaderPenilaian,
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
  BreadcrumbKehadiran,
  BreadcrumbKuisioner,
  BreadcrumbLogHarian,
  BreadcrumbLogHarianDetail,
  BreadcrumbPenilaian,
  BreadcrumbPenilaianDetail,
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
import {
  LogHarianDPLDetail,
  LogHarianDosen,
  LogHarianMahasiswa,
  LogHarianMahasiswaDosenDetail,
} from "./pages/log-harian";
import {
  KehadiranDPL,
  KehadiranDosen,
  KehadiranMahasiswa,
} from "./pages/kehadiran";
import KuisionerBox from "./pages/kuisioner";
import { PenilaianDPL, PenilaianMahasiswaDosen } from "./pages/penilaian";

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
        <BreadcrumbLogHarian />
      </Flex>
      <LogHarianMahasiswa />
    </Box>
  );
}

function LogHarianDetail() {
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
        <BreadcrumbLogHarianDetail />
      </Flex>
      <LogHarianMahasiswaDosenDetail />
    </Box>
  );
}

function Kehadiran() {
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
      <HeaderKehadiran />
      <Flex>
        <KehadiranLogo />
        <Spacer />
        <BreadcrumbKehadiran />
      </Flex>
      <KehadiranDPL />
    </Box>
  );
}

function Penilaian() {
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
      <HeaderPenilaian />
      <Flex>
        <PenilaianLogo />
        <Spacer />
        <BreadcrumbPenilaian />
      </Flex>
      <PenilaianMahasiswaDosen />
    </Box>
  );
}

function Kuisioner() {
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
      <HeaderKuisioner />
      <Flex>
        <KuisionerLogo />
        <Spacer />
        <BreadcrumbKuisioner />
      </Flex>
      <KuisionerBox />
    </Box>
  );
}

export {
  Dashboard,
  Profile,
  ProfileChange,
  RencanaKegiatan,
  RencanaKegiatanDetail,
  LogHarian,
  LogHarianDetail,
  Kehadiran,
  Penilaian,
  Kuisioner,
};
