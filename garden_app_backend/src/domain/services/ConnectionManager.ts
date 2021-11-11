import { IConnectionRepository, IConnection } from "../interface/IConnection";

class ConnectionManager {
    private connectionRepository;
    private connections: Array<IConnection>;
    constructor({ connectionRepository }: { connectionRepository: IConnectionRepository }) {
        this.connections = [];
        this.connectionRepository = connectionRepository;

    }
    async getConnections() {
        const data = await this.connectionRepository.getConnections();
        data.forEach(connection => this.connections.push(connection));
        return this.connections;
    }
    async saveConnection(connection: IConnection) {
        this.connections.push(connection);
        await this.connectionRepository.saveConnections(connection);
    }
}

export default ConnectionManager;