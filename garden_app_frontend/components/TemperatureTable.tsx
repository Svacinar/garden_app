/* eslint react/no-children-prop: 0 */

import React, { ReactChildren, ReactChild, useState } from 'react';
import * as dayjs from 'dayjs';

import {
    Stack,
    Flex,
    Table,
    Thead,
    Heading,
    Tr,
    Tbody,
    Td,
    Th,
    TableCaption
} from '@chakra-ui/react';

export default function TemperatureTable({ temperatureData }) {
    const data = temperatureData;
    return (
        <>
            <Flex alignItems='center'>
                <Heading size='md'>Temperature overview</Heading>
            </Flex>
            <Stack direction='column'>
                {Object.keys(data).map((location, id) => {
                    return (
                        <div key={id}>
                            <Table>
                                <TableCaption placement='top'>Temperature overview for location: {location}</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Sensor name</Th>
                                        <Th>Temperature [Celsius]</Th>
                                        <Th>Humidity [%]</Th>
                                        <Th>Updated</Th>
                                    </Tr>
                                </Thead>
                                {Object.keys(data[location]).map((sensor, id) => {
                                    return (
                                        <Tbody key={id}>
                                            <Tr>
                                                <Td >{sensor}</Td>
                                                <Td>{data[location][sensor].temperature}</Td>
                                                <Td >{data[location][sensor].humidity}</Td>
                                                <Td>{dayjs().format('DD/MM/YYYY HH:mm:ss')}</Td>
                                            </Tr>
                                        </Tbody>
                                    )
                                })}
                            </Table>
                        </div>
                    )
                })}
            </Stack>
        </>)
}