import * as axios from "axios";
interface CredfinClient {
    environment?: string;
    secret?: string;
    identifier?: string;
    name?: string;
}
declare class Client {
    private instance;
    private secret;
    private identifier;
    private name;
    constructor(credfinClient: CredfinClient);
    get(path: string): Promise<axios.AxiosResponse<any>>;
    post(path: string, post?: any): Promise<axios.AxiosResponse<any>>;
    put(path: string): Promise<axios.AxiosResponse<any>>;
    delete(path: string): Promise<axios.AxiosResponse<any>>;
    private generateHmacHeaders;
}
export { Client };
