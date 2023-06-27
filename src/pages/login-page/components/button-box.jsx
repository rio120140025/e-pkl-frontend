import React from "react";
import { Button } from "@chakra-ui/button";

function ButtonBoxSignIn(cek) {
  return (
    <Button
      className="button-box"
      color={"#f5f5f5"}
      backgroundColor={"#bdcdd6"}
      onClick={() => cek.handleSignIn()}
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
