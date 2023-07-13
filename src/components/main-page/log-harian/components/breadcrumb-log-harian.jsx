import React from "react";
import {
    Box, Flex, Link, Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

function BreadcrumbLogharian(props) {
    return (
        <Box>
            <Flex direction="row">
                {props.detail === 'yes' ?
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/dashboard' color="#6096B4">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/log-harian' color="#6096B4">Log Harian</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href='/log-harian-detail'>Detail</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    :
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/dashboard' color="#6096B4">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink href='/log-harian'>Log Harian</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbItem>
                    </Breadcrumb>
                }

            </Flex>
        </Box>
    );
}

export default BreadcrumbLogharian;
