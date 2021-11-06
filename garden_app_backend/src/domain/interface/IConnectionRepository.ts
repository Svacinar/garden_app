import Connection from "./IConnection";

export default interface IConnectionRepository {
    getConnections: () => Array<{ name: string, endpoint: string }>,
    saveConnections: (connection: Connection) => Promise<void>,
}