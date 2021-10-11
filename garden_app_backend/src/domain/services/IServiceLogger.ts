export interface ILogger {
    info(string: string): void;
    log(string: string): void;
    error(string: string): void;
    warn(string: string): void;
}