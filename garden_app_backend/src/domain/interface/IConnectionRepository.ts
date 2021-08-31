export default interface IConnectionRepository {
    getConnections: () => Array<{ name: string, endpoint: string }>,
}