import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactComponent as Logo } from "../../assets/icon-showpass.svg";

function PasswordInput() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  return (
    <InputGroup size="md">
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
          type={show ? "text" : "password"}
        />
        {!isError ? (
          <FormHelperText />
        ) : (
          <FormErrorMessage>*this field must be filled</FormErrorMessage>
        )}
      </FormControl>
      <InputRightElement width="3rem">
        <Button size="sm" onClick={handleClick} variant={"ghost"}>
          {show ? <Logo /> : <Logo />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput;
