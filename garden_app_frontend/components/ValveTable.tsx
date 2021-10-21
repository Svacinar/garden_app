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
    TableCaption,
    useDisclosure,
    ModalOverlay,
    Modal,
    ModalHeader,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import ValveItem from './ValveItem';
import Valve from './Valve';
import { CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';

export default function ValveTable({ valveData, handleStateChange, handleTimerChange }: { handleStateChange: (valve: Valve, id: number) => void, valveData: any, handleTimerChange: (timer: number) => void }) {
    const [timer, setTimer] = useState(0);
    const [jobs, setJobs] = useState([]);
    const data = valveData;

    const { isOpen, onOpen, onClose } = useDisclosure();

    //TODO cancel remote jobs

    const startRemoteJobs = async () => {
        const body = {
            valves: [
                ...jobs
            ]
        }
        try {
            await axios.post('api/startQueue', body);
            setJobs([]);
        } catch (error: any) {
            console.error(error);
        }
    }

    const handleJobAddition = (valve: Valve) => {
        const job = valve; // TODO pridat novy typ a premapovat parametry
        job.endpoint = `${valve.endpoint}/valve`
        setJobs([...jobs, job])
    }
    return (
        <>
            <Flex alignItems='center'>
                <Heading size='md'>REMOTE CONTROL PANEL</Heading>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>VALVE CYCLING</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {Object.keys(data).map((connection, id) => {
                            return (
                                <div key={id}>
                                    {
                                        data[connection].map((valve: Valve, id: number) => {
                                            return (
                                                <Button key={id} onClick={() => handleJobAddition(valve)}>{valve.name}</Button>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })}
                        <Flex>
                            <p>Selected jobs</p>
                            <p>{jobs.map(element => ` -> ${element.name} (${element.timer / 1000}s)`)}</p>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={startRemoteJobs}>
                            Start process
                        </Button>
                        <Button variant="ghost" onClick={() => setJobs([])}>Clear processes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
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
                                <Button margin='15px' mt='0' onClick={onOpen}>CYCLE</Button>
                            </Flex>
                        </div>
                    )
                })}
            </Flex>
        </>)
}