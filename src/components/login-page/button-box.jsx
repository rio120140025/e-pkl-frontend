import React from "react";
import { Button } from "@chakra-ui/button";


function ButtonBoxSign(prop) {

  return (
    <Button
      onClick={() => prop.handle()}
      className="button-box"
      color={"#f5f5f5"}
      backgroundColor={"#bdcdd6"}
    >
      {prop.buttonType}
    </Button>
  );
}

export default ButtonBoxSign;
