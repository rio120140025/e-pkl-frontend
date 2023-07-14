import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportPDF = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState(null);
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
        const updatedData = response.data.body;
        setData(updatedData);
        console.log(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookies.jwt_token]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000/api/user/pkl/data",
          {
            headers: { Authorization: `Bearer ${cookies.jwt_token.data}` },
          }
        );
        const updatedData1 = response1.data.body;
        setData1(updatedData1);
        console.log(updatedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();
  }, [cookies.jwt_token]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response2 = await axios.get(
          "http://127.0.0.1:8000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${cookies.jwt_token.data}` },
          }
        );
        const updatedData2 = response2.data;
        setData2(updatedData2);
        console.log(updatedData2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData2();
  }, [cookies.jwt_token]);

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

    data.forEach((row) => {
      data1.forEach((row1) => {
        if (data2 && data2.id === row1.mahasiswa.id && row1.id === row.pkl_id) {
          const name = formatText(data2.name);
          const nim = formatText(data2.nim);
          const dosenPembimbing = formatText(row1.dospem.name);
          const dosenPembimbingLapangan = formatText(row1.dpl.name);
          const lokasiPKL = formatText(row1.mahasiswa.lokasi);

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

          const tableData = data
            .map((row) => {
              const rowData1 = data1.find((row1) => row1.id === row.pkl_id);
              if (data2 && rowData1 && data2.id === rowData1.mahasiswa.id) {
                return [
                  row.waktu,
                  row.kegiatan,
                  row.alatbahan,
                  row.materi,
                  row.prosedur,
                  row.hasil,
                  row.komentar,
                ];
              }
              return null;
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
        }
      });
    });
  };

  return (
    <div>
      <button onClick={exportPdf}>Export to PDF</button>
    </div>
  );
};

export default ExportPDF;
