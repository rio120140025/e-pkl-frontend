import React, { useRef, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import TableKehadiranMahasiswa from "../components/table-kehadiran-mahasiswa";
import TableKehadiranDosen from "../components/table-kehadiran-dosen";
import TableKehadiranDPL from "../components/table-kehadiran-dpl";
import { useCookies } from "react-cookie";
import axios from "axios";
import Tablekehadiran from "../components/table-kehadiran";

function KehadiranMahasiswa({ id, roles_id }) {

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
      <Tablekehadiran roles_id={roles_id} id={id} />
    </Box>
  );
}
function DetailKehadiran() {
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
      <TableKehadiranMahasiswa />
    </Box>
  );
}
function KehadiranDosen() {
  const boxRef = useRef(null);

  useEffect(() => {
    const updateBoxHeight = () => {
      const { height } = boxRef.current.getBoundingClientRect();
      boxRef.current.style.height = `${height + 25}px`;
    };

    window.addEventListener("resize", updateBoxHeight);
    updateBoxHeight();

    return () => {
      window.removeEventListener("resize", updateBoxHeight);
    };
  }, []);
  return (
    <Box
      ref={boxRef}
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      fontSize="15px"
    >
      <TableKehadiranDosen />
    </Box>
  );
}
function KehadiranDPL() {
  const boxRef = useRef(null);

  useEffect(() => {
    const updateBoxHeight = () => {
      const { height } = boxRef.current.getBoundingClientRect();
      boxRef.current.style.height = `${height + 25}px`;
    };

    window.addEventListener("resize", updateBoxHeight);
    updateBoxHeight();

    return () => {
      window.removeEventListener("resize", updateBoxHeight);
    };
  }, []);
  return (
    <Box
      ref={boxRef}
      position="absolute"
      marginTop="46px"
      left="78px"
      borderRadius="5px"
      background="#FFF"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      width="1375px"
      fontSize="15px"
    >
      <TableKehadiranDPL />
    </Box>
  );
}

export { KehadiranMahasiswa, DetailKehadiran, KehadiranDosen, KehadiranDPL };
