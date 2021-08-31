"use strict";
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
const express_1 = __importDefault(require("express"));
const ConnectionManager_1 = __importDefault(require("./domain/services/ConnectionManager"));
const ValveManager_1 = __importDefault(require("./domain/services/ValveManager"));
const ConnectionRepository_1 = __importDefault(require("./infrastructure/repository/ConnectionRepository"));
const app = (0, express_1.default)();
const connectionRepository = new ConnectionRepository_1.default();
const valveManager = new ValveManager_1.default();
const connectionManager = new ConnectionManager_1.default({ connectionRepository });
app.listen(3000, () => {
    console.log('hello');
});
app.get('/valves', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connections = yield connectionManager.getConnections();
    const valveStates = yield valveManager.initializeValveConnections(connections);
    console.log(valveStates);
    res.json(valveStates);
}));