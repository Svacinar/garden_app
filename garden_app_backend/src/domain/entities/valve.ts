export interface Valve {
    name: string,
    status: boolean,
    timer: number,
    endpoint: string,
}

class ValveFactory {
    constructor() {

    };
    createValve(valveData: { name: string, status: boolean, timer: number }) {
        return {
            name: valveData.name,
            status: valveData.status,
            timer: valveData.timer,
        };
    }
}

export default ValveFactory;