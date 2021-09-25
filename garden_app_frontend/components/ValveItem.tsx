import React, { ReactChildren, ReactChild } from 'react';
import {
    Tbody,
    Tr,
    Td,
    Switch,
} from '@chakra-ui/react';
import Valve from './Valve';

interface ValveItemProps {
    id: number,
    valve: Valve,
    handleStateChange: (valve: Valve, id: number) => void
}

export default function ValveItem(props: ValveItemProps) {
    const renameProp = (propName: string | boolean) => {
        return (propName === true || propName === 'true') ? 'ON' : 'OFF'
    }
    return (
        <>
            <Tbody key={props.id} >
                <Tr>
                    <Td>{props.valve.name}</Td>
                    <Td data-testid={'valveState' + props.id}>{renameProp(props.valve.status)}</Td>
                    <Td>{props.valve.timer}</Td>
                    <Td>{props.valve.endpoint}</Td>
                    <Td>
                        <Switch isChecked={props.valve.status} data-testid={'valveSwitch' + props.id} aria-label={'valve-toggle' + props.id} colorScheme='teal' size='lg' onChange={() => props.handleStateChange(props.valve, props.id)} />
                    </Td>
                </Tr>
            </Tbody>
        </>
    );
}