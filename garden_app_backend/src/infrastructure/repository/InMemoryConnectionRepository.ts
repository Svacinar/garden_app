import { IConnection, IConnectionRepository } from "../../domain/interface/IConnection";

export default class ConnectionRepository implements IConnectionRepository {
    private result: Array<IConnection>;
    constructor() {
        this.result = [
            { name: 'Connnection 2', endpoint: '192.168.0.102' },
        ];
    }
    getConnections = () => {
        return this.result;
    }
    saveConnections = async (connection: IConnection) => {
        this.result.push(connection);
    }
}