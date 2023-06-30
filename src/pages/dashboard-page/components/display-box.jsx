import React from "react";
import { Box, Flex } from "@chakra-ui/layout";

function DisplayBox() {
  return (
    <Flex>
      <Box
        borderRadius="5"
        bgColor={"#fff"}
        borderColor={"#bdcdd6"}
        borderStyle={"solid"}
        borderWidth={1}
        width={286.41}
        height={"36px"}
        color={"black"}
      />
    </Flex>
  );
}

export default DisplayBox;
