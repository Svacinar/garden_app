/* eslint react/no-children-prop: 0 */

import React, { ReactChildren, ReactChild, useState } from 'react';
import {
    Button,
    Stack,
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
    Spacer,
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
    const [endpoint, setEndpoint] = useState('');
    const [name, setName] = useState('');
    const data = valveData;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenConnectionModal,
        onOpen: onOpenConnectionModal,
        onClose: onCloseConnectionModal,
    } = useDisclosure();

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

    const handleRemoteAddition = (e: Event) => {
        e.preventDefault();
        //TODO add job to backend
        console.log(`Add connection endpoint: ${endpoint} with name ${name}`)
    }
    return (
        <Stack>
            <Flex alignItems='center' >
                <Spacer />
                <Heading size='md'>REMOTE CONTROL PANEL</Heading>
                <Spacer />
                <Button onClick={onOpenConnectionModal}>+</Button>
            </Flex>
            <Modal isOpen={isOpenConnectionModal} onClose={onCloseConnectionModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Remote Connection</ModalHeader>
                    <ModalCloseButton />
                    <Flex direction="column" p={5} rounded={6}>
                        <Input placeholder="Connection name" variant="filed" mb={3} type="text" onChange={(e) => { console.log(e.target.value); setName(e.target.value) }} />
                        <Input placeholder="Endpoint" variant='filed' mb={6} type="text" onChange={(e) => setEndpoint(e.target.value)} />
                        <Button colorScheme="teal" onClick={handleRemoteAddition}>Add Connection</Button>
                    </Flex>
                </ModalContent>
            </Modal>

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
            <Stack direction='column'>
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
                        </div>
                    )
                })}
                <Flex margin='15px' >
                    <InputGroup mr='4'>
                        <InputLeftAddon children='Set timer to: ' />
                        <Input onChange={(e) => setTimer(e.target.value)} />
                        <InputRightAddon children='minutes' />
                    </InputGroup>
                    <Button onClick={() => handleTimerChange(timer)} rightIcon={< CheckIcon />} >SET</Button>
                    <Button margin='15px' mt='0' onClick={onOpen}>CYCLE</Button>
                </Flex>
            </Stack>
        </Stack >)
}