"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectionRepository {
    constructor() {
        this.getConnections = () => {
            const result = [
                { name: 'Connnection 2', endpoint: '192.168.0.102' }
            ];
            return result;
        };
    }
}
exports.default = ConnectionRepository;
