"use strict";
// to bude entita jednotlivyho ventilu
Object.defineProperty(exports, "__esModule", { value: true });
class ValveFactory {
    constructor() {
    }
    ;
    createValve(valveData) {
        return {
            name: valveData.name,
            status: valveData.status,
            timer: valveData.timer,
        };
    }
}
exports.default = ValveFactory;
