import React, { useState } from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import { Box, Text, useRadio, useRadioGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import "./RegisterRoleBox.css";

function Option(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        className="option-box"
        bg={"#fffff"}
        _checked={{ bg: "grey" }}
        _focus={{
          boxShadow: "outline",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function RoleBox() {
  const options = ["Mahasiswa", "Dosen", "Dosen Pembimbing"];
  const [selectedValue, setSelectedValue] = useState("");
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    value: selectedValue,
    onChange: (value) => setSelectedValue(value),
  });

  const group = getRootProps();

  return (
    <Center>
      <AbsoluteCenter>
        <Box className="box" maxW="sm" maxH="sm" p="25px">
          <SimpleGrid spacingY="20px">
            <Text className="header-cardbox">Select Role</Text>
            <SimpleGrid spacingY="15px" {...group}>
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <Option key={value} {...radio}>
                    {value}
                  </Option>
                );
              })}
            </SimpleGrid>
            <Link className="button-box" to={`/register-${selectedValue}`}>
              Next
            </Link>
          </SimpleGrid>
        </Box>
      </AbsoluteCenter>
    </Center>
  );
}

export default RoleBox;
