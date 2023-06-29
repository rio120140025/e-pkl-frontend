import React from "react";
import { Button } from "@chakra-ui/button";

function ButtonBoxDownload() {
  return (
    <Button
      className="button-box"
      variant="solid"
      w="121px"
      colorScheme="93BFCF"
      top="38.15px"
      left="30.5px"
    >
      Download
    </Button>
  );
}
function ButtonBoxSignUp() {
  return (
    <Button
      className="button-box"
      color={"#f5f5f5"}
      backgroundColor={"#bdcdd6"}
    >
      Sign Up
    </Button>
  );
}

export { ButtonBoxDownload, ButtonBoxSignUp };
