import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate()
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" padding={37}>
      <Box paddingLeft={84}>
        <Heading size="md">E-PKL</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="22px" paddingRight={84}>
        <Button
          borderRadius="15"
          bgColor={"#f5f5f5"}
          borderColor={"fff"}
          width={86.78}
          height={25}
          color={"#6096b4"}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
        <Button
          borderRadius="15"
          bgColor={"#f5f5f5"}
          boxShadow={"xl"}
          width={88.78}
          height={25}
          color={"#6096b4"}
          className="border"
          onClick={() => navigate('/signin')}
        >
          Sign in
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export default Header;
