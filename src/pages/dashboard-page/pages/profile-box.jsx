import React from "react";
import { Box, Center, Select, SimpleGrid, Text } from "@chakra-ui/react";

import { ButtonBoxUbah, ButtonBoxSimpanProfile } from "../components/button-box";
import DisplayBox from "../components/display-box";
import InputBox from "../../login-page/components/input-box";
import PasswordInput from "../../login-page/components/password";
import { ReactComponent as BackButton } from "../../../assets/button-back.svg";
import { Link } from "react-router-dom";

function ProfileBoxMahasiswa() {
  return (
    <Box
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      height="md"
      fontSize="15px"
    >
      <Center>
        <Text
          position="absolute"
          fontWeight={"bold"}
          marginTop={90}
          align={"center"}
        >
          Identitas Diri
        </Text>
      </Center>

      <Center marginTop={20}>
        <SimpleGrid columns={2} spacingX={150} spacingY={2}>
          <Box>
            Nama
            <DisplayBox />
          </Box>
          <Box>
            Nomor Telepon
            <DisplayBox />
          </Box>
          <Box>
            Email
            <DisplayBox />
          </Box>
          <Box>
            Tempat PKL
            <DisplayBox />
          </Box>
          <Box>
            NIM
            <DisplayBox />
          </Box>
          <Box>
            Dosen Pembimbing
            <Select
              borderRadius="5"
              bgColor={"#fff"}
              borderColor={"#bdcdd6"}
              borderStyle={"solid"}
              width={286.41}
              height={"36px"}
              color={"black"}
            >
              <option value={1}>Meida Cahyo Untoro, S.Kom., M.Kom</option>
              <option value={2}>Mugi Prasetyo, S.Kom., M.Kom</option>
              <option value={3}>Hirawati, S.Kom., M.Kom</option>
            </Select>
          </Box>
          <Box>
            Password
            <PasswordInput />
          </Box>
          <Box>
            Dosen Pembimbing Lapangan
            <DisplayBox />
          </Box>
        </SimpleGrid>
      </Center>

      <Center marginTop={5}>
        <ButtonBoxUbah />
      </Center>
    </Box>
  );
}
function ProfileBoxDosen() {
  return (
    <Box
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      height="575"
      fontSize="15px"
    >
      <Center>
        <Text
          position="absolute"
          fontWeight={"bold"}
          marginTop={90}
          align={"center"}
        >
          Identitas Diri
        </Text>
      </Center>

      <Center marginTop={20}>
        <SimpleGrid>
          <Box>
            Nama
            <DisplayBox />
          </Box>
          <Box>
            Email
            <DisplayBox />
          </Box>
          <Box>
            NRK/NIP
            <DisplayBox />
          </Box>
          <Box>
            NIM
            <DisplayBox />
          </Box>
          <Box>
            Password
            <PasswordInput />
          </Box>
          <Box>
            Nomor Telepon
            <DisplayBox />
          </Box>
        </SimpleGrid>
      </Center>

      <Center marginTop={5}>
        <ButtonBoxUbah />
      </Center>
    </Box>
  );
}
function ProfileBoxDPL() {
  return (
    <Box
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      height="md"
      fontSize="15px"
    >
      <Center>
        <Text
          position="absolute"
          fontWeight={"bold"}
          marginTop={90}
          align={"center"}
        >
          Identitas Diri
        </Text>
      </Center>

      <Center marginTop={20}>
        <SimpleGrid columns={2} spacingX={150} spacingY={2}>
          <Box>
            Nama
            <DisplayBox />
          </Box>
          <Box>
            Nomor Telepon
            <DisplayBox />
          </Box>
          <Box>
            Email
            <DisplayBox />
          </Box>
          <Box>
            Jabatan
            <DisplayBox />
          </Box>
          <Box>
            NRK/NIP
            <DisplayBox />
          </Box>
          <Box>
            Instansi
            <DisplayBox />
          </Box>
          <Box>
            Password
            <PasswordInput />
          </Box>
        </SimpleGrid>
      </Center>

      <Center marginTop={5}>
        <ButtonBoxUbah />
      </Center>
    </Box>
  );
}

function ChangeProfileBoxMahasiswa() {
  return (
    <Box
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      height="md"
      fontSize="15px"
    >
      <Link position="relative" marginTop={3} to="/profile">
        <BackButton />
      </Link>
      <Center>
        <Text
          position="absolute"
          fontWeight={"bold"}
          marginTop={5}
          align={"center"}
        >
          Identitas Diri
        </Text>
      </Center>

      <Center marginTop={12}>
        <SimpleGrid columns={2} spacingX={150}>
          <Box>
            Nama
            <InputBox />
          </Box>
          <Box>
            Nomor Telepon
            <InputBox />
          </Box>
          <Box>
            Email
            <DisplayBox />
          </Box>
          <Box>
            Tempat PKL
            <InputBox />
          </Box>
          <Box>
            NIM
            <InputBox />
          </Box>
          <Box>
            Dosen Pembimbing
            <Select
              borderRadius="5"
              bgColor={"#fff"}
              borderColor={"#bdcdd6"}
              borderStyle={"solid"}
              width={286.41}
              height={"36px"}
              color={"black"}
            >
              <option value={1}>Meida Cahyo Untoro, S.Kom., M.Kom</option>
              <option value={2}>Mugi Prasetyo, S.Kom., M.Kom</option>
              <option value={3}>Hirawati, S.Kom., M.Kom</option>
            </Select>
          </Box>
          <Box>
            Password
            <PasswordInput />
          </Box>
          <Box>
            Dosen Pembimbing Lapangan
            <InputBox />
          </Box>
        </SimpleGrid>
      </Center>

      <Center marginTop={5}>
        <ButtonBoxSimpanProfile />
      </Center>
    </Box>
  );
}

function ChangeProfileBoxDosen() {
  return (
    <Box
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      height="575"
      fontSize="15px"
    >
      <Link position="relative" marginTop={3} to="/profile">
        <BackButton />
      </Link>
      <Center>
        <Text
          position="absolute"
          fontWeight={"bold"}
          marginTop={15}
          align={"center"}
        >
          Identitas Diri
        </Text>
      </Center>

      <Center marginTop={12}>
        <SimpleGrid>
          <Box>
            Nama
            <InputBox />
          </Box>
          <Box>
            Email
            <DisplayBox />
          </Box>
          <Box>
            NRK/NIP
            <InputBox />
          </Box>
          <Box>
            NIM
            <InputBox />
          </Box>
          <Box>
            Password
            <PasswordInput />
          </Box>
          <Box>
            Nomor Telepon
            <InputBox />
          </Box>
        </SimpleGrid>
      </Center>

      <Center marginTop={5}>
        <ButtonBoxSimpanProfile />
      </Center>
    </Box>
  );
}
function ChangeProfileBoxDPL() {
  return (
    <Box
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      height="md"
      fontSize="15px"
    >
      <Link position="relative" marginTop={3} to="/profile">
        <BackButton />
      </Link>
      <Center>
        <Text
          position="absolute"
          fontWeight={"bold"}
          marginTop={5}
          align={"center"}
        >
          Identitas Diri
        </Text>
      </Center>

      <Center marginTop={12}>
        <SimpleGrid columns={2} spacingX={150}>
          <Box>
            Nama
            <InputBox />
          </Box>
          <Box>
            Nomor Telepon
            <InputBox />
          </Box>
          <Box>
            Email
            <DisplayBox />
          </Box>
          <Box>
            Jabatan
            <InputBox />
          </Box>
          <Box>
            NRK/NIP
            <InputBox />
          </Box>
          <Box>
            Instansi
            <InputBox />
          </Box>
          <Box>
            Password
            <PasswordInput />
          </Box>
        </SimpleGrid>
      </Center>

      <Center marginTop={5}>
        <ButtonBoxSimpanProfile />
      </Center>
    </Box>
  );
}

export {
  ProfileBoxMahasiswa,
  ProfileBoxDosen,
  ProfileBoxDPL,
  ChangeProfileBoxMahasiswa,
  ChangeProfileBoxDosen,
  ChangeProfileBoxDPL,
};
