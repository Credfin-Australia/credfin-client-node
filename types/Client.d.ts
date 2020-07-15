declare class Client {
    constructor();
    get(path: string): Promise<any>;
    post(path: string, post?: any): Promise<{
        'DateTimeUTC': string;
        "Content-MD5": string;
        "Content-Type": string;
        Authorization: string;
    }>;
    put(path: string): Promise<{
        'DateTimeUTC': string;
        "Content-MD5": string;
        "Content-Type": string;
        Authorization: string;
    }>;
}
export { Client };
