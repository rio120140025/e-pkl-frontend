import React from "react";
import { Button } from "@chakra-ui/button";

function ButtonBoxSignIn() {
  return (
    <Button
      className="button-box"
      color={"#f5f5f5"}
      backgroundColor={"#bdcdd6"}
    >
      Sign In
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

export { ButtonBoxSignIn, ButtonBoxSignUp };
