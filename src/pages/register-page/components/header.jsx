import React from "react";
import { ButtonGroup } from "@chakra-ui/react";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

import "../../login-page/components/header.css";

function Header() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" padding={37}>
      <Box paddingLeft={84}>
        <Heading size="md">E-PKL</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="22px" paddingRight={84}>
        <Link className="button-click" to="/register">
          Sign Up
        </Link>
        <Link className="button-nonclick" to="/">
          Sign in
        </Link>
      </ButtonGroup>
    </Flex>
  );
}

export default Header;
