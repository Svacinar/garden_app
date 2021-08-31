// dostane list valve connections z connection managera -> odesle dotaz na jejich stav // navrh na jmeno ValveCOnnectionManager

import { Valve } from '../entities/valve'
import Connection from '../interface/IConnection';

import axios, { AxiosResponse } from 'axios';

const DEFAULT_TIMER = 6000;

class ValveManager {
    private valves: Record<string, Array<Valve>>;
    constructor() {
        this.valves = {};
    };
    async initializeValveConnections(connections: Array<Connection>) {
        connections.forEach(async connection => {
            try {
                const response: AxiosResponse = await axios.get<any>(`http://${connection.endpoint}/`);
                const data = response.data;
                const valveData: Valve[] = [];
                Object.keys(data).forEach((valve) => {
                    const valveObj: Valve = {
                        name: valve,
                        status: !data[valve],
                        timer: DEFAULT_TIMER,
                        endpoint: connection.endpoint,
                    };
                    valveData.push(valveObj);
                });
                this.valves[connection.name] = valveData;
                console.log(this.valves);
            } catch (error) {
                throw new Error('Something went wrong with Api call: ' + error);
            }
        })
        return this.valves;
    };
    /*     updateValveStates() {
            this.valves.forEach(valve => {
                console.log(valve);
                // connection grouping -> jak se to bude resit??
            })
        } */
}

export default ValveManager;