import React from "react";
import { Input } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";

function InputBox() {
  return (
    <Flex>
      <Input
        borderRadius="5"
        bgColor={"#fff"}
        borderColor={"#bdcdd6"}
        borderStyle={"solid"}
        width={286.41}
        height={"36px"}
        color={"#6096b4"}
      ></Input>
    </Flex>
  );
}

export default InputBox;
