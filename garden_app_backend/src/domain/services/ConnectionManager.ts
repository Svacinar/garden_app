import Connection from "../interface/IConnection";
import IConnectionRepository from "../interface/IConnectionRepository";

class ConnectionManager {
    private connectionRepository;
    private connections: Array<Connection>;
    constructor({ connectionRepository }: { connectionRepository: IConnectionRepository }) {
        this.connections = [];
        this.connectionRepository = connectionRepository;

    }
    async getConnections() {
        const data = await this.connectionRepository.getConnections();
        data.forEach(connection => this.connections.push(connection));
        return this.connections;
    }
}

export default ConnectionManager;