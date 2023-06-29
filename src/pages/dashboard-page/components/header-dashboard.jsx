import React from "react";
import { ButtonGroup } from "@chakra-ui/react";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

import "./header-dashboard.css";

function HeaderDashboard() {
  return (
    <Box bgColor={"#BDCDD6"}>
      <Flex minWidth="max-content" gap="2" padding={"12px"}>
        <Box paddingLeft={84}>
          <Heading size="md">E-PKL</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="22px" paddingRight={84}>
          <Link className="button-click-dashboard" to="/dashboard">
            Dashboard
          </Link>
          <Link className="button-nonclick-dashboard" to="/profile">
            Profile
          </Link>
          <Link className="button-nonclick-dashboard" to="/rencana-kegiatan">
            Rencana Kegiatan
          </Link>
          <Link className="button-nonclick-dashboard" to="/log-harian">
            Log Harian
          </Link>
          <Link className="button-nonclick-dashboard" to="/kehadiran">
            Kehadiran
          </Link>
          <Link className="button-nonclick-dashboard" to="/penilaian-pkl">
            Penilaian PKL
          </Link>
          <Link className="button-nonclick-dashboard" to="/kuisioner">
            Kuisioner
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

function HeaderKehadiran() {
  return (
    <Box bgColor={"#BDCDD6"}>
      <Flex minWidth="max-content" gap="2" padding={"12px"}>
        <Box paddingLeft={84}>
          <Heading size="md">E-PKL</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="22px" paddingRight={84}>
          <Link className="button-nonclick-dashboard" to="/dashboard">
            Dashboard
          </Link>
          <Link className="button-nonclick-dashboard" to="/profile">
            Profile
          </Link>
          <Link className="button-nonclick-dashboard" to="/rencana-kegiatan">
            Rencana Kegiatan
          </Link>
          <Link className="button-nonclick-dashboard" to="/log-harian">
            Log Harian
          </Link>
          <Link className="button-click-dashboard" to="/kehadiran">
            Kehadiran
          </Link>
          <Link className="button-nonclick-dashboard" to="/penilaian-pkl">
            Penilaian PKL
          </Link>
          <Link className="button-nonclick-dashboard" to="/kuisioner">
            Kuisioner
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

function HeaderKuisioner() {
  return (
    <Box bgColor={"#BDCDD6"}>
      <Flex minWidth="max-content" gap="2" padding={"12px"}>
        <Box paddingLeft={84}>
          <Heading size="md">E-PKL</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="22px" paddingRight={84}>
          <Link className="button-nonclick-dashboard" to="/dashboard">
            Dashboard
          </Link>
          <Link className="button-nonclick-dashboard" to="/profile">
            Profile
          </Link>
          <Link className="button-nonclick-dashboard" to="/rencana-kegiatan">
            Rencana Kegiatan
          </Link>
          <Link className="button-nonclick-dashboard" to="/log-harian">
            Log Harian
          </Link>
          <Link className="button-nonclick-dashboard" to="/kehadiran">
            Kehadiran
          </Link>
          <Link className="button-nonclick-dashboard" to="/penilaian-pkl">
            Penilaian PKL
          </Link>
          <Link className="button-click-dashboard" to="/kuisioner">
            Kuisioner
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

function HeaderLogHarian() {
  return (
    <Box bgColor={"#BDCDD6"}>
      <Flex minWidth="max-content" gap="2" padding={"12px"}>
        <Box paddingLeft={84}>
          <Heading size="md">E-PKL</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="22px" paddingRight={84}>
          <Link className="button-nonclick-dashboard" to="/dashboard">
            Dashboard
          </Link>
          <Link className="button-nonclick-dashboard" to="/profile">
            Profile
          </Link>
          <Link className="button-nonclick-dashboard" to="/rencana-kegiatan">
            Rencana Kegiatan
          </Link>
          <Link className="button-nonclick-dashboard" to="/log-harian">
            Log Harian
          </Link>
          <Link className="button-click-dashboard" to="/kehadiran">
            Kehadiran
          </Link>
          <Link className="button-nonclick-dashboard" to="/penilaian-pkl">
            Penilaian PKL
          </Link>
          <Link className="button-nonclick-dashboard" to="/kuisioner">
            Kuisioner
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

function HeaderPenilaian() {
  return (
    <Box bgColor={"#BDCDD6"}>
      <Flex minWidth="max-content" gap="2" padding={"12px"}>
        <Box paddingLeft={84}>
          <Heading size="md">E-PKL</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="22px" paddingRight={84}>
          <Link className="button-nonclick-dashboard" to="/dashboard">
            Dashboard
          </Link>
          <Link className="button-nonclick-dashboard" to="/profile">
            Profile
          </Link>
          <Link className="button-nonclick-dashboard" to="/rencana-kegiatan">
            Rencana Kegiatan
          </Link>
          <Link className="button-nonclick-dashboard" to="/log-harian">
            Log Harian
          </Link>
          <Link className="button-nonclick-dashboard" to="/kehadiran">
            Kehadiran
          </Link>
          <Link className="button-click-dashboard" to="/penilaian-pkl">
            Penilaian PKL
          </Link>
          <Link className="button-nonclick-dashboard" to="/kuisioner">
            Kuisioner
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

function HeaderProfil() {
  return (
    <Box bgColor={"#BDCDD6"}>
      <Flex minWidth="max-content" gap="2" padding={"12px"}>
        <Box paddingLeft={84}>
          <Heading size="md">E-PKL</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="22px" paddingRight={84}>
          <Link className="button-nonclick-dashboard" to="/dashboard">
            Dashboard
          </Link>
          <Link className="button-click-dashboard" to="/profile">
            Profile
          </Link>
          <Link className="button-nonclick-dashboard" to="/rencana-kegiatan">
            Rencana Kegiatan
          </Link>
          <Link className="button-nonclick-dashboard" to="/log-harian">
            Log Harian
          </Link>
          <Link className="button-nonclick-dashboard" to="/kehadiran">
            Kehadiran
          </Link>
          <Link className="button-nonclick-dashboard" to="/penilaian-pkl">
            Penilaian PKL
          </Link>
          <Link className="button-nonclick-dashboard" to="/kuisioner">
            Kuisioner
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

function HeaderRencanaKegiatan() {
  return (
    <Box bgColor={"#BDCDD6"}>
      <Flex minWidth="max-content" gap="2" padding={"12px"}>
        <Box paddingLeft={84}>
          <Heading size="md">E-PKL</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="22px" paddingRight={84}>
          <Link className="button-nonclick-dashboard" to="/dashboard">
            Dashboard
          </Link>
          <Link className="button-nonclick-dashboard" to="/profile">
            Profile
          </Link>
          <Link className="button-click-dashboard" to="/rencana-kegiatan">
            Rencana Kegiatan
          </Link>
          <Link className="button-nonclick-dashboard" to="/log-harian">
            Log Harian
          </Link>
          <Link className="button-nonclick-dashboard" to="/kehadiran">
            Kehadiran
          </Link>
          <Link className="button-nonclick-dashboard" to="/penilaian-pkl">
            Penilaian PKL
          </Link>
          <Link className="button-nonclick-dashboard" to="/kuisioner">
            Kuisioner
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export {
  HeaderDashboard,
  HeaderKehadiran,
  HeaderKuisioner,
  HeaderLogHarian,
  HeaderPenilaian,
  HeaderProfil,
  HeaderRencanaKegiatan,
};
