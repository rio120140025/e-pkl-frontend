import React, { useEffect, useState } from "react";
import { AbsoluteCenter, Box, Center, Flex, Spacer } from "@chakra-ui/layout";

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
import {
  DashboardBoxDosenDPL,
  DashboardBoxMahasiswa,
} from "./pages/dashboard-box";
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
  BreadcrumbKehadiranDetail,
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
import { LogHarianTable } from "./pages/log-harian";
import {
  KehadiranDPL,
  KehadiranDosen,
  KehadiranMahasiswa,
  DetailKehadiran,
} from "./pages/kehadiran";
import KuisionerBox from "./pages/kuisioner";
import { PenilaianPKL } from "./pages/penilaian";
import axios from "axios";
import { useCookies } from "react-cookie";
import GetDataLogin from "./components/get-data-login";

function Dashboard() {
  const [data1, setData1] = useState(null);
  const [cookies] = useCookies(["name"]);
  const [id, setId] = useState(localStorage.getItem("id") || null);
  const [roles_id, setRolesId] = useState(
    localStorage.getItem("roles_id") || null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000/api/user/profile",
          {
            headers: { Authorization: "Bearer " + cookies.jwt_token.data },
          }
        );
        const updatedData1 = response1.data;
        setData1(updatedData1);
        setRolesId(updatedData1.roles_id);
        setId(updatedData1.id);
        localStorage.setItem("roles_id", updatedData1.roles_id);
        localStorage.setItem("id", updatedData1.id);
        console.log(updatedData1);
        console.log("id", updatedData1.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookies.jwt_token.data]);

  return (
    <>
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
        <Flex direction="column" py="10px" mx="5.27%">
          <Box marginTop={"100px"} />
          <HaloUser name={data1?.name} />
          <Box>
            <DashboardBoxMahasiswa id={data1?.id} />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

function Profile() {
  const roles_id = parseInt(localStorage.getItem("roles_id"));
  console.log(roles_id);
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
      <ProfileBoxMahasiswa roles_id={roles_id} />
    </Box>
  );
}

function ProfileChange() {
  const roles_id = parseInt(localStorage.getItem("roles_id"));
  console.log(roles_id);
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
      <ChangeProfileBoxMahasiswa roles_id={roles_id} />
    </Box>
  );
}

function RencanaKegiatan() {
  const [data1, setData1] = useState(null);
  const [cookies] = useCookies(["name"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000/api/user/profile",
          {
            headers: { Authorization: "Bearer " + cookies.jwt_token.data },
          }
        );
        const updatedData1 = response1.data;
        setData1(updatedData1);
        console.log(updatedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookies.jwt_token.data]);

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
      <RencanaKegiatanBox roles_id={data1?.roles_id} id={data1?.id} />
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
      <LogHarianTable />
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
      <LogHarianTable detail="yes" />
    </Box>
  );
}

function Kehadiran() {
  const [data1, setData1] = useState(null);
  const [cookies] = useCookies(["name"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000/api/user/profile",
          {
            headers: { Authorization: "Bearer " + cookies.jwt_token.data },
          }
        );
        const updatedData1 = response1.data;
        setData1(updatedData1);
        console.log(updatedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookies.jwt_token.data]);

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
      <KehadiranMahasiswa roles_id={data1?.roles_id} id={data1?.id} />
    </Box>
  );
}
function KehadiranDetail() {
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
        <BreadcrumbKehadiranDetail />
      </Flex>
      <DetailKehadiran />
    </Box>
  );
}

function Penilaian() {
  return (
    <Box
      height={"100vh"}
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
      <PenilaianPKL />
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
  KehadiranDetail,
  Penilaian,
  Kuisioner,
};
