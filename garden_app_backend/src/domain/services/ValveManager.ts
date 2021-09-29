import { Valve } from '../entities/valve'
import Connection from '../interface/IConnection';

import axios, { AxiosResponse } from 'axios';

const DEFAULT_TIMER = 900000;

class ValveManager {
    private valves: Record<string, Array<Valve>>;
    private timer: number;
    constructor() {
        this.timer = DEFAULT_TIMER;
        this.valves = {};
    };
    async initializeValveConnections(connections: Array<Connection>) {
        for (const connection of connections) {
            try {
                const response: AxiosResponse = await axios.get<any>(`http://${connection.endpoint}/`);
                const data = response.data;
                const valveData: Valve[] = [];
                Object.keys(data).forEach((valve) => {
                    const valveObj: Valve = {
                        name: valve,
                        status: !data[valve],
                        timer: this.timer,
                        endpoint: connection.endpoint,
                    };
                    valveData.push(valveObj);
                });
                this.valves[connection.name] = valveData;
            } catch (error) {
                throw new Error('Something went wrong with Api call: ' + error);
            }
        }
        return this.valves;
    };
    async setTimer(timer: number) {
        this.timer = timer;
    }
}

export default ValveManager;