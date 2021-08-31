"use strict";
// dostane list valve connections z connection managera -> odesle dotaz na jejich stav // navrh na jmeno ValveCOnnectionManager
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const DEFAULT_TIMER = 6000;
class ValveManager {
    constructor() {
        this.valves = {};
    }
    ;
    initializeValveConnections(connections) {
        return __awaiter(this, void 0, void 0, function* () {
            connections.forEach((connection) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield axios_1.default.get(`http://${connection.endpoint}/`);
                    const data = response.data;
                    const valveData = [];
                    Object.keys(data).forEach((valve) => {
                        const valveObj = {
                            name: valve,
                            status: !data[valve],
                            timer: DEFAULT_TIMER,
                            endpoint: connection.endpoint,
                        };
                        valveData.push(valveObj);
                    });
                    this.valves[connection.name] = valveData;
                    console.log(this.valves);
                }
                catch (error) {
                    throw new Error('Something went wrong with Api call: ' + error);
                }
            }));
            return this.valves;
        });
    }
    ;
}
exports.default = ValveManager;
