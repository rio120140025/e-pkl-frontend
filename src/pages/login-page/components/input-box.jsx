import React, { useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { Box, Text, Flex } from "@chakra-ui/layout";

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

function InputBox2(props) {
  const [input, setInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const handleInputBlur = () => setIsTouched(true);

  const isError = isTouched && props.input === "";

  return (
    <Box width="max-content">
      <Text>{props.name}</Text>
      <FormControl isInvalid={isError}>
        <Input
          value={props.input}
          onChange={(e) => props.handleSet(e)}
          onBlur={handleInputBlur}
          width="373.913px"
          height="36px"
          borderRadius="5px"
          border="1px solid #BDCDD6"
          background="#FFF"
          py="7.5px"
          px="13px"
          color='#000'
          fontSize='14px'
          fontStyle='normal'
          fontWeight='400'
          lineHeight='normal'
        />
        {!isError ? null : (
          <FormErrorMessage>*this field must be filled</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
}

export { InputBox, InputBox2 };
