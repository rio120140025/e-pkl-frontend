import React, { useRef, useEffect } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import TableRencanaKegiatan from "../components/table-rencana-kegiatan";
import TableRencanaKegiatanDetail from "../components/table-rencana-kegiatan-detail-mahasiswa";
import TableRencanaKegiatanDetailMahasiswa from "../components/table-rencana-kegiatan-detail-mahasiswa";
import TableRencanaKegiatanDetailDosen from "../components/table-rencana-kegiatan-detail-dosen";
import TableRencanaKegiatanDetailDPL from "../components/table-rencana-kegiatan-detail-dpl";

function RencanaKegiatanBox() {
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
      <TableRencanaKegiatan />
    </Box>
  );
}

function RencanaKegiatanBoxDetailMahasiswa() {
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
      <TableRencanaKegiatanDetailMahasiswa />
    </Box>
  );
}

function RencanaKegiatanBoxDetailDosen() {
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
      <TableRencanaKegiatanDetailDosen />
    </Box>
  );
}

function RencanaKegiatanBoxDetailDPL() {
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
      <TableRencanaKegiatanDetailDPL />
    </Box>
  );
}

export {RencanaKegiatanBox, RencanaKegiatanBoxDetailMahasiswa, RencanaKegiatanBoxDetailDosen, RencanaKegiatanBoxDetailDPL};
