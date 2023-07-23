import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@chakra-ui/react";


const ExportPDF = (props) => {
  const exportPdf = () => {
    const doc = new jsPDF();
    const startY = 20;
    const lineHeight = 10;

    const formatText = (text) => {
      const maxLength = 70;
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text || "";
    };
    const name = formatText(props.dataNilai.mahasiswa?.name);
    const nim = formatText(props.dataNilai.mahasiswa?.nim);
    const dosenPembimbing = formatText(props.dataNilai.dospem?.name);
    const dosenPembimbingLapangan = formatText(props.dataNilai.dpl?.name);
    const lokasiPKL = formatText(props.dataNilai.mahasiswa?.lokasi);

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

    const tableHeaders = ["Kategori", "Penilaian"];
    const tableData = [
      ["Pengetahuan", props.dataNilai.penilaian?.pengetahuan],
      ["Pelaksanaan", props.dataNilai.penilaian?.pelaksanaan],
      ["Kerjasama", props.dataNilai.penilaian?.kerjasama],
      ["Kreativitas", props.dataNilai.penilaian?.kreativitas],
      ["Kedisiplinan", props.dataNilai.penilaian?.kedisiplinan],
      ["Sikap", props.dataNilai.penilaian?.sikap],
      ["Rata-rata", props.dataNilai.penilaian?.rerata],
    ];

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
        cellPadding: 5, // Padding dalam sel
        fillColor: "#f2f2f2", // Warna latar belakang sel
        textColor: "#333", // Warna teks dalam sel
        lineColor: "#aaa", // Warna garis bingkai tabel
      },
    });

    doc.save("document.pdf");
  }

  return (
    <Button
      className="button-box-2"
      bg="#FFD02C"
      color='#FFFFFF'
      _hover={{ background: "#FFF5D2", color: "#FFD02C" }
      }
      onClick={exportPdf} > Export</Button >
  );
};

export default ExportPDF;