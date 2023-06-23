import React, { useState } from "react";
import { FormControl, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";

function InputBox() {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";
  return (
    <Flex>
      <FormControl isInvalid={isError}>
        <Input
          value={input}
          onChange={handleInputChange}
          borderRadius="5"
          bgColor={"#fff"}
          borderColor={"#bdcdd6"}
          borderStyle={"solid"}
          width={286.41}
          height={"36px"}
          color={"black"}
        />
          {!isError ? (
            <FormHelperText/>
          ) : (
            <FormErrorMessage>*this field must be filled</FormErrorMessage>
          )}
      </FormControl>
    </Flex>
  );
}

export default InputBox;
