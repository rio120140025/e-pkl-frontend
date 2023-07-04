import React, { useEffect, useState } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/layout";

import Header from "./components/header-dashboard";
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
import axios from "axios";
import { useCookies } from "react-cookie";

function Dashboard() {
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies(["name"]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/profile", {
          headers: { Authorization: "Bearer " + cookies.jwt_token.data },
        });
        const updatedData = response.data;
        setData(updatedData);
        console.log(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      <Header page="1" />
      <DashboardLogo />
      <HaloUser name={data.name}/>
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
      <Header page="2" />
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
      <Header page="2" />
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
      <Header page="3" />
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
      <Header page="3" />
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
      <Header page="4" />
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
      <Header page="4" />
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
      <Header page="5" />
      <Flex>
        <KehadiranLogo />
        <Spacer />
        <BreadcrumbKehadiran />
      </Flex>
      <KehadiranMahasiswa />
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
      <Header page="6" />
      <Flex>
        <PenilaianLogo />
        <Spacer />
        <BreadcrumbPenilaian />
      </Flex>
      <PenilaianDPL />
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
      <Header page="7" />
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