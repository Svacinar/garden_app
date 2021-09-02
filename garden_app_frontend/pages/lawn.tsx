import {
    Button, Flex, Table,
    Thead,
    Tbody,
    Tfoot,
    Heading,
    Tr,
    Th,
    Td,
    TableCaption,
    Switch,
} from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

const Lawn: NextPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData]: [any, any] = useState({});
    useEffect(() => {
        stateUpdater()
    }, [])

    const stateUpdater = () => {
        setIsLoading(true);
        axios.get('api/lawnHandler')
            .then((data) => {
                console.log(data.data);
                setData(data.data);

            })
            .then(() => setIsLoaded(true))
            .then(() => console.log(data))
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
        setTimeout(() => console.log('test'), 5000);
    }

    const handleStateChange = async (valve) => {
        console.log(valve);
        const body = {
            valveId: 0,
            state: true,
            timer: 6000
        }
        const response = await axios.post('http://192.168.0.102/valve', body);
        console.log(response);

    }

    return (
        <Flex height="80vh" alignItems="center" justifyContent="center">
            <Flex alignItems="center" direction="column" border='5px solid' borderColor='gray.100' p={12} rounded={6}>
                {isLoaded ?
                    <Heading size='md'>Data Loaded</Heading> : <Heading size='md'>Loading data...</Heading>
                }
                <Flex>
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
                                    {data[connection].map((valve, id) => {
                                        console.log(JSON.stringify(valve));
                                        return (
                                            <Tbody key={id}>
                                                <Tr>
                                                    <Td>{valve.name}</Td>
                                                    <Td >{String(valve.status)}</Td>
                                                    <Td>{valve.timer}</Td>
                                                    <Td>{valve.endpoint}</Td>
                                                    <Td>
                                                        <Switch colorScheme='teal' size='lg' onClick={() => handleStateChange(valve)} />
                                                    </Td>
                                                </Tr>
                                            </Tbody>

                                        )
                                    })}
                                </Table>


                            </div>
                        )
                    })}
                </Flex>
                <Button margin="8px" isLoading={isLoading} colorScheme="teal" onClick={stateUpdater}>Update Data</Button>
            </Flex >
        </Flex >
    )
}

export default Lawn