import React from "react";
import { Box } from "@chakra-ui/layout";

import Header from "./components/header";
import RoleBox from "./components/register-role";
import RegisterBoxMahasiswa from "./components/mahasiswa/register-mahasiswa-box";
import RegisterBoxDosen from "./components/dosen/register-dosen-box";
import RegisterBoxDPL from "./components/dpl/register-dpl-box";

function RoleRegister() {
  return (
    <Box
      bgImage={"background.jpg"}
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Header />
      <RoleBox />
    </Box>
  );
}

function RoleRegisterMahasiswa() {
  return (
    <Box
      bgImage={"background.jpg"}
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Header />
      <RegisterBoxMahasiswa />
    </Box>
  );
}

function RoleRegisterDosen() {
  return (
    <Box
      bgImage={"background.jpg"}
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Header />
      <RegisterBoxDosen />
    </Box>
  );
}

function RoleRegisterDPL() {
  return (
    <Box
      bgImage={"background.jpg"}
      height={"100vh"}
      width={"100vw"}
      w="100%"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Header />
      <RegisterBoxDPL />
    </Box>
  );
}

export {
  RoleRegister,
  RoleRegisterDPL,
  RoleRegisterDosen,
  RoleRegisterMahasiswa,
};
