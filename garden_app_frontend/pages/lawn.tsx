import {
    Flex,
    Heading,

} from '@chakra-ui/react';
import axios from 'axios';
import ValveTable from '../components/ValveTable';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Valve from '../components/Valve';

const Lawn: NextPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [valveData, setValveData]: [any, any] = useState({});
    useEffect(() => {
        const intervalId = setInterval(stateUpdater, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const stateUpdater = async () => {
        try {
            const result = await axios.get('api/getValvesData');
            setValveData(result.data);
            setIsError(false);
            setIsLoaded(true);
        } catch (error) {
            setIsError(true);
        }
    }

    const handleStateChange = (valve: Valve, id: number) => {
        const newValveState = {
            valveId: id,
            state: !valve.status,
            timer: valve.timer,
        };
        const endpoint = valve.endpoint;
        axios.post('api/setValveState', {
            newValveState,
            endpoint,
        });
    }

    return (
        <Flex height="80vh" alignItems="center" justifyContent="center">
            <Flex alignItems="center" direction="column" border='5px solid' borderColor='gray.100' p={12} rounded={6}>
                {console.log(valveData)}
                {isLoaded ? <ValveTable valveData={valveData} handleStateChange={handleStateChange} />
                    : isError ? <Heading size='md'>Something went wrong...</Heading>
                        : <Heading size='md'>Loading data...</Heading>}
            </Flex >
        </Flex >
    )
}

export default Lawn