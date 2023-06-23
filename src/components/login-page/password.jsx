import React from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ReactComponent as Logo } from "../../assets/icon-showpass.svg";

function PasswordInput() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        borderRadius="5"
        bgColor={"#fff"}
        borderColor={"#bdcdd6"}
        borderStyle={"solid"}
        width={286.41}
        height={"36px"}
        color={"black"}
        type={show ? "text" : "password"}
      />
      <InputRightElement width='3rem'>
        <Button size="sm" onClick={handleClick} variant={'ghost'}>
          {show ? <Logo/> : <Logo/>}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput;
