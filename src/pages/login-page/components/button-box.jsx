import React from "react";
import { Button } from "@chakra-ui/button";

function ButtonBoxSignIn(prop) {
  return (
    <Button
      className="button-box"
      color={"#f5f5f5"}
      backgroundColor={"#bdcdd6"}
      onClick={() => prop.handle()}
    >
      {prop.buttonType}
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
