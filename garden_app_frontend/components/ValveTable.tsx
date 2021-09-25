import React, { ReactChildren, ReactChild } from 'react';
import {
    Button,
    Flex,
    Table,
    Thead,
    Heading,
    Tr,
    Th,
    TableCaption,
} from '@chakra-ui/react';
import ValveItem from './ValveItem';
import Valve from './Valve';

export default function ValveTable({ valveData, handleStateChange }: { handleStateChange: (valve: Valve, id: number) => void, valveData: any }) {
    const data = valveData;
    return (
        <>
            <Heading size='md'>Data loaded</Heading>
            <Flex data-testid="connection-table">
                {Object.keys(data).map((connection, id) => {
                    return (
                        <div key={id}>
                            <Table>
                                <TableCaption placement='top'>Valve state for {connection}</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Status</Th>
                                        <Th>Timer</Th>
                                        <Th>Endpoint</Th>
                                        <Th>ON/OFF</Th>
                                    </Tr>
                                </Thead>
                                {data[connection].map((valve: Valve, id: number) => {
                                    console.log(valve.status);
                                    const checked = (valve.status === 'true' || valve.status === true) ? true : false;
                                    console.log(checked)
                                    return (
                                        <ValveItem key={id} id={id} valve={valve} handleStateChange={handleStateChange} />
                                    )
                                })}
                            </Table>
                        </div>
                    )
                })}
            </Flex>
        </>)
}