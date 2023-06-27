import React from "react";
import { Button } from "@chakra-ui/button";

function ButtonBoxSignIn(test) {
  return (
    <Button
      className="button-box"
      color={"#f5f5f5"}
      onClick={() => test.handleSignIn()}
      backgroundColor={"#bdcdd6"}
    >
      Sign In handleSignIn
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
