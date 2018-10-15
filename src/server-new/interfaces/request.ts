export interface IMockRequest {
    params: any;
    path?: string;
    url: {
        pathname: string;
        search: string;
    };
    headers?: {
        [key: string]: string;
    },
    info: {
        hostname: string;
    }
}

export interface IHeader {
    [key: string]: string;
}

export type IProxyCallback = (err: any, url: string, headers: IHeader) => void;
