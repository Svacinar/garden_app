// to bude entita jednotlivyho ventilu

// parametry pro manipulaci

// load -> prvotni status -> notLoaded -> div nic nezobrazi -> jen wait

// potom co dostane data ze vsech (nastavenejch, v preferencich) endpointu -> pro kazdou vygeneruje button -> to bude nejakej grid


// div vola managera na api, kterej vytahuje vsechny nasetovany connectiony do valves a posila je zpet. zde jsou zobrazeny

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