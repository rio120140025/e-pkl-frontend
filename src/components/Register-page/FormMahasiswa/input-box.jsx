import React from "react";
import { Input } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import "./input-box.css";

function InputBox() {
  return (
    <Flex>
      <Input
        className="input-box"
      ></Input>
    </Flex>
  );
}

export default InputBox;
