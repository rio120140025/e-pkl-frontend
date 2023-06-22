import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/layout";
import "./header.css";

function Header() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md" className="e-pkl">
          E-PKL
        </Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="22px" className="button">
        <Button className="sign-up">Sign Up</Button>
        <Button className="sign-in">Log in</Button>
      </ButtonGroup>
    </Flex>
  );
}

export default Header;
