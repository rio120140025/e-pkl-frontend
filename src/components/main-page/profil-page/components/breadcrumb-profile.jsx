import React from "react";
import {
    Box, Flex, Link, Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

function BreadcrumbProfileUbah() {
    return (
        <Box>
            <Flex direction="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/dashboard' color="#6096B4">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='/profile'>Profile</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex>
        </Box>
    );
}

export default BreadcrumbProfileUbah;
