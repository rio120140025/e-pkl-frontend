import React, { useRef, useEffect } from "react";
import { Box, HStack, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { ButtonBoxKirim } from "../components/button-box";

function KuisionerBox() {
  const boxRef = useRef(null);

  const [value1, setValue1] = React.useState("1");
  const [value2, setValue2] = React.useState("1");
  const [value3, setValue3] = React.useState("1");
  const [value4, setValue4] = React.useState("1");
  const [value5, setValue5] = React.useState("1");
  const [value6, setValue6] = React.useState("1");

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
      <Box marginTop="28.86px" marginLeft="30.5px">
        <VStack spacing={15} align={"stretch"}>
          <Text as="b">KUISIONER PKL</Text>
          <Text>
            1. Rata - rata kemampuan dasar mahasiswa dalam menyelesaikan
            pekerjaan.
          </Text>
          <RadioGroup onChange={setValue1} value={value1}>
            <HStack gap={19} direction="row">
              <Text>Sangat Kurang</Text>
              <Radio value="1" colorScheme="gray" />
              <Radio value="2" colorScheme="gray" />
              <Radio value="3" colorScheme="gray" />
              <Radio value="4" colorScheme="gray" />
              <Radio value="5" colorScheme="gray" />
              <Text>Sangat Baik</Text>
            </HStack>
          </RadioGroup>
          <Text>
            2. Disiplin dan Sikap mahasiswa dalam berkomunikasi dan berintraksi
            selama pelaksanaan PKL?
          </Text>
          <RadioGroup onChange={setValue2} value={value2}>
            <HStack gap={19} direction="row">
              <Text>Sangat Kurang</Text>
              <Radio value="1" colorScheme="gray" />
              <Radio value="2" colorScheme="gray" />
              <Radio value="3" colorScheme="gray" />
              <Radio value="4" colorScheme="gray" />
              <Radio value="5" colorScheme="gray" />
              <Text>Sangat Baik</Text>
            </HStack>
          </RadioGroup>
          <Text>
            3. Dampak kehadiran mahasiswa PKL dalam pelaksanaan perkerjaan
            operasional perusahaan/instansi?
          </Text>
          <RadioGroup onChange={setValue3} value={value3}>
            <HStack gap={19} direction="row">
              <Text>Sangat Kurang</Text>
              <Radio value="1" colorScheme="gray" />
              <Radio value="2" colorScheme="gray" />
              <Radio value="3" colorScheme="gray" />
              <Radio value="4" colorScheme="gray" />
              <Radio value="5" colorScheme="gray" />
              <Text>Sangat Baik</Text>
            </HStack>
          </RadioGroup>
          <Text>
            4. Apakah Bapak/Ibu memberikan arahan pekerjaan kepada para
            mahasiswa?
          </Text>
          <RadioGroup onChange={setValue4} value={value4}>
            <HStack gap={19} direction="row">
              <Text>Sangat Kurang</Text>
              <Radio value="1" colorScheme="gray" />
              <Radio value="2" colorScheme="gray" />
              <Radio value="3" colorScheme="gray" />
              <Radio value="4" colorScheme="gray" />
              <Radio value="5" colorScheme="gray" />
              <Text>Sangat Baik</Text>
            </HStack>
          </RadioGroup>
          <Text>
            5. Apakah Bapak/Ibu memberi ruang diskusi kepada para mahasiswa?
          </Text>
          <RadioGroup onChange={setValue5} value={value5}>
            <HStack gap={19} direction="row">
              <Text>Sangat Kurang</Text>
              <Radio value="1" colorScheme="gray" />
              <Radio value="2" colorScheme="gray" />
              <Radio value="3" colorScheme="gray" />
              <Radio value="4" colorScheme="gray" />
              <Radio value="5" colorScheme="gray" />
              <Text>Sangat Baik</Text>
            </HStack>
          </RadioGroup>
          <Text>6. Secara umum bagaimana kinerja mahasiswa selama PKL?</Text>
          <RadioGroup onChange={setValue6} value={value6}>
            <HStack gap={19} direction="row">
              <Text>Sangat Kurang</Text>
              <Radio value="1" colorScheme="gray" />
              <Radio value="2" colorScheme="gray" />
              <Radio value="3" colorScheme="gray" />
              <Radio value="4" colorScheme="gray" />
              <Radio value="5" colorScheme="gray" />
              <Text>Sangat Baik</Text>
            </HStack>
          </RadioGroup>
        </VStack>
      </Box>
      <ButtonBoxKirim/>
    </Box>
  );
}

export default KuisionerBox;
