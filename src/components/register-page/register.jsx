import React from "react";
import Header from "./header";
import RoleBox from "./register-role";
import RegisterBoxMahasiswa from "./register-mahasiswa-box";
import RegisterBoxDosen from "./register-dosen-box";
import RegisterBoxDPL from "./register-dpl-box";

function RoleRegister() {
  return (
    <div>
      <Header />
      <RoleBox />
    </div>
  );
}

function RoleRegisterMahasiswa() {
  return (
    <div>
      <Header />
      <RegisterBoxMahasiswa />
    </div>
  );
}

function RoleRegisterDosen() {
  return (
    <div>
      <Header />
      <RegisterBoxDosen />
    </div>
  );
}

function RoleRegisterDPL() {
  return (
    <div>
      <Header />
      <RegisterBoxDPL />
    </div>
  );
}

export {
  RoleRegister,
  RoleRegisterDPL,
  RoleRegisterDosen,
  RoleRegisterMahasiswa,
};
