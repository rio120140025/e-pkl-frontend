import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/layout";
import "./header.css";

function Header2() {
	return (
		<div className="auth-header-container">
			<h1>E - PKL</h1>
			<div className="auth-header-right">
				<div className="link active">
					<a href="!#">Dashboard</a>
				</div>
				<div className="link">
					<a href="!#">Profile</a>
				</div>
				<div className="link">
					<a href="!#">Rencana Kegiatan</a>
				</div>
			</div>
		</div>
	);
}

export default Header2;
