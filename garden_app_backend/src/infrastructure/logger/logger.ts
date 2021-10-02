interface ILogger {
    info(string: string): void;
    log(string: string): void;
    error(string: string): void;
    warn(string: string): void;
}

class Logger implements ILogger {
    private moduleName: string;
    constructor(module: NodeModule) {
        this.moduleName = this.getModuleName(module.filename);
    }
    info(string: string) {
        console.info(`${new Date().toISOString()}: [${this.moduleName}] INFO: ${string}`);
    }
    log(string: string) {
        console.log(`${new Date().toISOString()}: [${this.moduleName}] LOG: ${string}`);
    }
    error(string: string) {
        console.error(`${new Date().toISOString()}: [${this.moduleName}] ERROR: ${string}`);
    }
    warn(string: string) {
        console.warn(`${new Date().toISOString()}: [${this.moduleName}] WARN: ${string}`);
    }
    getModuleName(fileName: string) {
        const array = fileName.split('/');
        const index = array.indexOf('dist');
        return array.slice(index + 1).join('/');
    }
}

export { Logger }