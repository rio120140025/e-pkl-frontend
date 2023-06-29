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
function ButtonBoxUbah() {
  return (
    <Button
      className="button-box"
      variant="solid"
      w="121px"
      colorScheme="93BFCF"
    >
      Ubah
    </Button>
  );
}

export { ButtonBoxDownload, ButtonBoxUbah };
