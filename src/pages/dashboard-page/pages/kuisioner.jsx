import { Box } from "@chakra-ui/layout";
import React from "react";

function KuisionerBox() {
  const googleFormUrl = "https://forms.gle/Zn4sxbCVZy5E74gM9";

  return (
    <Box
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      fontSize="15px"
    >
      <iframe
        src={googleFormUrl}
        title="Google Form"
        width="100%"
        height="500px"
      >
        Loading...
      </iframe>
    </Box>
  );
}

export default KuisionerBox;
