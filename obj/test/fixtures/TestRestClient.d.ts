export declare class TestRestClient {
    private _rest;
    constructor();
    get(path: string, callback: (err: any, req: any, res: any, result: any) => void): void;
    head(path: string, callback: (err: any, req: any, res: any, result: any) => void): void;
    post(path: string, params: any, callback: (err: any, req: any, res: any, result: any) => void): void;
    put(path: string, params: any, callback: (err: any, req: any, res: any, result: any) => void): void;
    del(path: string, callback: (err: any, req: any, res: any, result: any) => void): void;
    getAsUser(sessionId: string, path: string, callback: (err: any, req: any, res: any, result: any) => void): void;
    headAsUser(sessionId: string, path: string, callback: (err: any, req: any, res: any, result: any) => void): void;
    postAsUser(sessionId: string, path: string, params: any, callback: (err: any, req: any, res: any, result: any) => void): void;
    putAsUser(sessionId: string, path: string, params: any, callback: (err: any, req: any, res: any, result: any) => void): void;
    delAsUser(sessionId: string, path: string, callback: (err: any, req: any, res: any, result: any) => void): void;
}
