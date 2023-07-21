import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@chakra-ui/react";

const ExportPDF = (props) => {
  const [dataJurnal, setDataJurnal] = useState([]);
  const [cookies] = useCookies(["jwt_token"]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/jurnal/data",
          {
            headers: { Authorization: `Bearer ${cookies.jwt_token.data}` },
          }
        );

        const updatedData = response.data.body.filter((data) => data.pkl_id == props.data.id);
        setDataJurnal(updatedData)
        console.log("Updated Data:", updatedData);
        console.log('props.data', props.data)
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [props.data.id]);

  const exportPdf = () => {
    const doc = new jsPDF();
    const startY = 20;
    const lineHeight = 10;

    const formatText = (text) => {
      const maxLength = 70;
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };
    dataJurnal.forEach((row) => {
      const name = formatText(props.data.mahasiswa.name);
      const nim = formatText(props.data.mahasiswa.nim);
      const dosenPembimbing = formatText(props.data.dospem.name);
      const dosenPembimbingLapangan = formatText(props.data.dpl.name);
      const lokasiPKL = formatText(props.data.mahasiswa.lokasi);

      doc.setFontSize(16);
      doc.text("Penilaian PKL", 10, startY);
      doc.setFontSize(12);
      doc.text(`Nama: ${name}`, 10, startY + lineHeight);
      doc.text(`Nim: ${nim}`, 10, startY + 2 * lineHeight);
      doc.text(
        `Dosen Pembimbing: ${dosenPembimbing}`,
        10,
        startY + 3 * lineHeight
      );
      doc.text(
        `Dosen Pembimbing Lapangan: ${dosenPembimbingLapangan}`,
        10,
        startY + 4 * lineHeight
      );
      doc.text(`Lokasi PKL: ${lokasiPKL}`, 10, startY + 5 * lineHeight);

      const tableHeaders = [
        "Waktu",
        "Kegiatan",
        "Alat dan Bahan",
        "Materi",
        "Prosedur",
        "Hasil",
        "Komentar",
      ];

      const tableData = dataJurnal
        .map((row) => {
          return [
            row.waktu,
            row.kegiatan,
            row.alatbahan,
            row.materi,
            row.prosedur,
            row.hasil,
            row.komentar,
          ];

        })
        .filter(Boolean);

      doc.autoTable({
        head: [tableHeaders],
        body: tableData,
        startY: startY + 60,
        margin: { top: 10 },
        tableWidth: "auto", // Mengatur tabel agar rata kanan kiri
        theme: "plain",
        styles: {
          overflow: "linebreak",
          halign: "center", // Menengahkan teks dalam sel header dan body
          valign: "middle", // Posisi vertikal teks di tengah sel
          fontSize: 12, // Ukuran font untuk teks sel
          cellPadding: 3, // Padding dalam sel
          fillColor: "#f2f2f2", // Warna latar belakang sel
          textColor: "#333", // Warna teks dalam sel
          lineColor: "#aaa", // Warna garis bingkai tabel
        },
      });

      doc.save("document.pdf");

    });
  };

  return (

    <Button variant="solid"
      w="81px"
      h="26px"
      cursor={"pointer"}
      textAlign={"center"}
      fontWeight={"bold"}
      bgColor={"#FFD02C"}
      borderRadius={5}
      color={"white"}
      _hover={{ background: "#FFF5D2", color: "#FFD02C" }}
      onClick={exportPdf}>Export</Button>
  );
};

export default ExportPDF;
