import IConnectionRepository from "../../domain/interface/IConnectionRepository";

export default class ConnectionRepository implements IConnectionRepository {
    getConnections = () => {
        const result = [
            { name: 'Connnection 2', endpoint: '192.168.0.102' }
        ]
        return result;
    }
}