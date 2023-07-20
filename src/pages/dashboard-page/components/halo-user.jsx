import { Box, Flex, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";
import { Text, Button } from "@chakra-ui/react";

import { ReactComponent as ButtonClose } from "../../../assets/button-close.svg";

function HaloUser({ name }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Box
          position={"relative"}
          borderRadius="5px"
          backgroundColor="#e1e7ea"
          boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
          width="101%"
          height="36px"
          fontSize="14px"
          marginBottom={"20px"}
        >
          <Flex gap="1" marginTop={1.5} marginLeft={5}>
            <Text display="inline-block">Halo</Text>
            <Text display="inline-block" fontWeight="bold">
              {name}
            </Text>
            <Text display="inline-block">
              Selamat datang di aplikasi E-PKL.
            </Text>
            <Spacer />
            <Button
              bottom={2}
              variant="ghost"
              color="BDCDD6"
              onClick={handleClose}
            >
              <ButtonClose />
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default HaloUser;
