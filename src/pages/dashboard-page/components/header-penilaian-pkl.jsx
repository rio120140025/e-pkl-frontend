import React from "react";
import { ButtonGroup } from "@chakra-ui/react";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

import "./header-dashboard.css";

function Header() {
  return (
    <Box bgColor={"#BDCDD6"}>
      <Flex minWidth="max-content" gap="2" padding={'12px'}>
        <Box paddingLeft={84}>
          <Heading size="md">E-PKL</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="22px" paddingRight={84}>
          <Link className="button-nonclick-dashboard">Dashboard</Link>
          <Link className="button-nonclick-dashboard">Profile</Link>
          <Link className="button-nonclick-dashboard">Rencana Kegiatan</Link>
          <Link className="button-nonclick-dashboard">Log Harian</Link>
          <Link className="button-nonclick-dashboard">Kehadiran</Link>
          <Link className="button-click-dashboard">Penilaian PKL</Link>
          <Link className="button-nonclick-dashboard">Kuisioner</Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default Header;
