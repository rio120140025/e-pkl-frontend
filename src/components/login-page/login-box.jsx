import React, { useState, useEffect } from "react";
import { AbsoluteCenter, Center, SimpleGrid } from "@chakra-ui/layout";
import {
	Box,
	Text,
	Modal,
	useDisclosure,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import "./box.css";

import InputBox from "./input-box";
import PasswordInput from "./password";
import { ButtonBoxSignIn } from "./button-box";

function LoginBox() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ErrorLogin, setErrorLogin] = useState(null)
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies(['name']);

	const handleSignIn = () => {
		const loginData = {
			email: email,
			password: password,
		};

		// Contoh AXIOS yang bawa Token
		// axios.post("http://127.0.0.1:8000/api/user/login", loginData, {
		// 	headers: {'Authorization': 'Bearer ' + cookies.token},
		// }).then(response => {
		// 			console.log('response', response)
		// 			setCookie("jwt_token", response)
		// 			if (response != null) {
		// 				navigate("/dashboard");
		// 			}
		// 			setErrorLogin("ADA SESUATU SALAH")

		// 		}).catch(error => {
		// 			console.log('error', error)
		// 			setErrorLogin(error.response.data.reason)
		// 		}).finally(() => {

		// 		});

		axios.post("http://127.0.0.1:8000/api/user/login", loginData, {
			headers: { 'Authorization': 'Bearer ' + cookies.token },
		}).then(response => {
			// 200
			console.log('response', response)
			setCookie("jwt_token", response)
			if (response != null) {
				navigate("/dashboard");
			}
			setErrorLogin("ADA SESUATU SALAH")

		}).catch(error => {
			console.log('error', error)
			setErrorLogin(error.response.data.reason)
		}).finally(() => {

		});
	};

	useEffect(() => {
		console.log('password = ', password)
	}, [password]);
	useEffect(() => {
		console.log('email = ', email)
	}, [email]);

	useEffect(() => {

	}, []);

	return (
		<Center>
			<AbsoluteCenter>
				<Box className="box" maxW="sm" maxH="sm" p="25px">
					<SimpleGrid spacingY="20px">
						<Box>

							Email
							<input type="text" />
							<InputBox email={email} handleSetEmail={(e) => setEmail(e.target.value)} />
						</Box>
						<Box>
							Password
							<PasswordInput password={password} handleSetPassword={(e) => setPassword(e.target.value)} />
						</Box>
						<ButtonBoxSignIn test="test" handleSignIn={() => handleSignIn()}>Sign In test</ButtonBoxSignIn>
						<Text className="button-text" onClick={onOpen} cursor="pointer">
							Forgot password?
						</Text>
						Ini erorrnya = {(ErrorLogin != null) ? ErrorLogin : ''}
					</SimpleGrid>
				</Box>
			</AbsoluteCenter>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalBody>
						<ModalCloseButton color={"#FF0000"} />
						<Text
							textAlign={"center"}
							mt={5}
							mb={5}
							color={"#FF0000"}
							fontWeight={"bold"}
						>
							Forgot Password
						</Text>
						<Text
							textAlign={"center"}
							mt={5}
							mb={5}
							color={"#6096B4"}
							fontWeight={"bold"}
						>
							Please Contact Admin
						</Text>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Center>
	);
}

export default LoginBox;
