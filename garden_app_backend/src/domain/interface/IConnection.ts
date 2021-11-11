interface IConnection {
    name: string,
    endpoint: string,
};

interface IConnectionManager {
    getConnections(): Promise<IConnection[]>;
    saveConnection(connection: IConnection): Promise<void>;
}

interface IConnectionRepository {
    getConnections: () => Array<{ name: string, endpoint: string }>,
    saveConnections: (connection: IConnection) => Promise<void>,
}

export {
    IConnection,
    IConnectionManager,
    IConnectionRepository,
}