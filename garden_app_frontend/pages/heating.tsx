import type { NextPage } from 'next';
import {
    Flex, Heading
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import TemperatureTable from '../components/TemperatureTable';


//TODO get data via api call
const data = {
    data: {
        living_room: {
            sensor1: {
                temperature: 25,
                humidity: 50,
            },
            sensor2: {
                temperature: 25,
                humidity: 33,
            },
        },
        sauna: {
            sensor1: {
                temperature: 103,
                humidity: 80,
            },
        },

    }
}

const fakeData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 2000);
    });
}



const Heating: NextPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [temperatureData, setTemperatureData] = useState(false);

    const stateUpdater = async () => {
        try {
            const result = await fakeData();
            setTemperatureData(result.data);
            setIsLoaded(true);
            setIsError(false);
        } catch (e) {
            setIsError(true);
            setIsLoaded(false);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(stateUpdater, 5000);
        return () => clearInterval(intervalId);
    }, [])
    return (
        <Flex height='80vh' alignItems='center' justifyContent='center' >
            <Flex alignItems="center" direction="column" border='5px solid' borderColor='gray.100' p={6} rounded={6}>
                {isLoaded ? <TemperatureTable temperatureData={temperatureData}>Here is data</TemperatureTable>
                    : isError ? <Heading size='md'>Something went wrong...</Heading>
                        : <Heading size='md'>Loading Data...</Heading>}</Flex>

        </Flex>


    )
}

export default Heating