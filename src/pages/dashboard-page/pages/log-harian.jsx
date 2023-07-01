import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import TableLogHarianMahasiswa from "../components/table-log-harian-mahasiswa";
import TableLogHarianDosen from "../components/table-log-harian-dosen";
import TableLogHarianMahasiswaDosenDetail from "../components/table-log-harian-detail-mahasiswa-dosen";
import TableLogHarianDPLDetail from "../components/table-log-harian-detail-dpl";

function LogHarianMahasiswa() {
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
      <TableLogHarianMahasiswa />
    </Box>
  );
}
function LogHarianMahasiswaDosenDetail() {
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
      <TableLogHarianMahasiswaDosenDetail />
    </Box>
  );
}
function LogHarianDosen() {
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
      <TableLogHarianDosen />
    </Box>
  );
}
function LogHarianDPLDetail() {
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
      <TableLogHarianDPLDetail />
    </Box>
  );
}

export {
  LogHarianMahasiswa,
  LogHarianMahasiswaDosenDetail,
  LogHarianDosen,
  LogHarianDPLDetail,
};
