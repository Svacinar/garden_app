import Connection from "../../domain/interface/IConnection";
import IConnectionRepository from "../../domain/interface/IConnectionRepository";

export default class ConnectionRepository implements IConnectionRepository {
    private result: Array<Connection>;
    constructor() {
        this.result = [
            { name: 'Connnection 2', endpoint: '192.168.0.102' },
        ];
    }
    getConnections = () => {
        return this.result;
    }
    saveConnections = async (connection: Connection) => {
        this.result.push(connection);
    }
}