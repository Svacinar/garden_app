/* eslint react/no-children-prop: 0 */

import React, { ReactChildren, ReactChild, useState } from 'react';
import {
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Flex,
    Table,
    Thead,
    Heading,
    Tr,
    Th,
    TableCaption
} from '@chakra-ui/react';
import ValveItem from './ValveItem';
import Valve from './Valve';
import { CheckIcon } from '@chakra-ui/icons';

export default function ValveTable({ valveData, handleStateChange, handleTimerChange }: { handleStateChange: (valve: Valve, id: number) => void, valveData: any, handleTimerChange: (timer: number) => void }) {
    const [timer, setTimer] = useState(0);
    const data = valveData;
    return (
        <>
            <Heading size='md'>REMOTE CONTROL PANEL</Heading>
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
                                    const checked = (valve.status === 'true' || valve.status === true) ? true : false;
                                    return (
                                        <ValveItem key={id} id={id} valve={valve} handleStateChange={handleStateChange} />
                                    )
                                })}
                            </Table>
                            <Flex margin='15px' >
                                <InputGroup mr='4'>
                                    <InputLeftAddon children='Set timer to: ' />
                                    <Input onChange={(e) => setTimer(e.target.value)} />
                                    <InputRightAddon children='minutes' />
                                </InputGroup>
                                <Button onClick={() => handleTimerChange(timer)} rightIcon={< CheckIcon />} >SET</Button>
                            </Flex>
                        </div>
                    )
                })}
            </Flex>
        </>)
}