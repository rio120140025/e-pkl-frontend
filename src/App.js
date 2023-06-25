import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login-page/login";
import RoleBox from "./components/register-page/register-role";
import RegisterMahasiswa from "./components/register-page/register-mahasiswa-box";
import RegisterDosen from "./components/register-page/register-dosen-box";
import RegisterDPL from "./components/register-page/register-dpl-box";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<RoleBox />} />
          <Route path="/register-mahasiswa" element={<RegisterMahasiswa />} />
          <Route path="/register-dosen" element={<RegisterDosen />} />
          <Route path="/register-dpl" element={<RegisterDPL />} />

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
