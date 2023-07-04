import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react";

import { ReactComponent as Logo } from "../../../../assets/icon-showpass.svg";

function PasswordInput(props) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [isTouched, setIsTouched] = useState(false);

  const handleInputBlur = () => setIsTouched(true);

  const isError = isTouched && props.password === "";

  return (
    <Box width="max-content" >
      <Text>Password</Text>
      <InputGroup>
        <FormControl isInvalid={isError}>
          <Input
            value={props.password}
            onChange={e => props.handleSetPassword(e)}
            onBlur={handleInputBlur}
            borderRadius="5"
            bgColor={"#fff"}
            borderColor={"#bdcdd6"}
            borderStyle={"solid"}
            height={"36px"}
            color={"black"}
            type={show ? "text" : "password"}
            width='373.913px'
          />
          {!isError ? (
            null
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
    </Box>
  );
}

export default PasswordInput;