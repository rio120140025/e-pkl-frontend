import React, { useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";

function InputBox(props) {
  const [isTouched, setIsTouched] = useState(false);
  const handleInputBlur = () => setIsTouched(true);

  const isError = isTouched && props.input === "";

  return (
    <Flex>
      <FormControl isInvalid={isError}>
        <Input
          value={props.input}
          onChange={(e) => props.handleSet(e)}
          onBlur={handleInputBlur}
          borderRadius="5"
          bgColor={"#fff"}
          borderColor={"#bdcdd6"}
          borderStyle={"solid"}
          width={286.41}
          height={"36px"}
          color={"black"}
        />
        {!isError ? (
          <FormHelperText />
        ) : (
          <FormErrorMessage>*this field must be filled</FormErrorMessage>
        )}
      </FormControl>
    </Flex>
  );
}


export default InputBox