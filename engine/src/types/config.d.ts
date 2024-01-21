export interface Config {
    port?: number;
    mongodb: {
        credentials?: {
            username: string;
            password: string;
            host: string;
            port: number;
        };
        url?: string;
    }
    auth?: {
        username: string;
        password: string;
    }
}