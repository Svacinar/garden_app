export class ErrorException extends Error {
    public status: number;
    public metaData: any = null;
    constructor(code: string = 'UnknownError', metaData: any = null) {
        super(code);
        this.name = code;
        this.status = 500;
        this.metaData = metaData;
        if (code === 'Unauthenticated') {
            this.status = 401;
        }
        if (code === 'NotFound') {
            this.status = 404;
        }
    }
}
