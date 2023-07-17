import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import TableLogHarian from '../components/components log harian/table-log-harian'
import TableDetail from '../components/components log harian/table-detail'

function LogHarianTable(props) {
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
      height="max-content"
    >
      {props.detail == "yes" ? <TableDetail /> : <TableLogHarian />}
    </Box>
  );
}



export { LogHarianTable };
