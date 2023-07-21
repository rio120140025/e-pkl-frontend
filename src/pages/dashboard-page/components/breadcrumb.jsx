import { Flex } from "@chakra-ui/layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";

function BreadcrumbProfile() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/profile/ubah">Profile</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
function BreadcrumbProfileUbah() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/profile">
            Profile
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/profile/ubah">Ubah Profile</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
function BreadcrumbRencanaKegiatan() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/rencana-kegiatan">
            Rencana Kegiatan
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
function BreadcrumbRencanaKegiatanDetail() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/rencana-kegiatan">
            Rencana Kegiatan
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/rencana-kegiatan/detail">
            Detail
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
function BreadcrumbLogHarian() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/log-harian">Log Harian</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
function BreadcrumbLogHarianDetail() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/log-harian">
            Log Harian
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/log-harian/detail">Detail</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
function BreadcrumbKehadiran() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/kehadiran">Kehadiran</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}

function BreadcrumbKehadiranDetail() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/kehadiran">
            Kehadiran
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/kehadiran">Detail</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
function BreadcrumbPenilaian() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/penilaian">Penilaian</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
function BreadcrumbKuisioner() {
  return (
    <Flex marginRight={84} marginTop={65}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color={"#6096B4"} href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/kuisioner">Kuisioner</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}

export {
  BreadcrumbProfile,
  BreadcrumbProfileUbah,
  BreadcrumbRencanaKegiatan,
  BreadcrumbRencanaKegiatanDetail,
  BreadcrumbLogHarian,
  BreadcrumbLogHarianDetail,
  BreadcrumbKehadiran,
  BreadcrumbKehadiranDetail,
  BreadcrumbPenilaian,
  BreadcrumbKuisioner,
};