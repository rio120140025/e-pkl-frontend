import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import TableComponentPenilaian from "../components/components Penilaian/table-penilaian"

function PenilaianPKL() {
  // const boxRef = useRef(null);
  const roles_id = localStorage.getItem('roles_id');
  const id = localStorage.getItem("id");

  // useEffect(() => {
  //   const updateBoxHeight = () => {
  //     const { height } = boxRef.current.getBoundingClientRect();
  //     boxRef.current.style.height = `${height + 25}px`;
  //   };

  //   window.addEventListener("resize", updateBoxHeight);
  //   updateBoxHeight();

  //   return () => {
  //     window.removeEventListener("resize", updateBoxHeight);
  //   };
  // }, []);
  return (
    <Box
      // ref={boxRef}
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
      <TableComponentPenilaian roles_id={roles_id} id={id} />
    </Box>
  );
}



export { PenilaianPKL };
