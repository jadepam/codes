declare function logClass1(params: string): (target: any) => void;
declare function logClass2(params: string): (target: any) => void;
declare function logAttribute1(params?: string): (target: any, attrName: any) => void;
declare function logAttribute2(params?: string): (target: any, attrName: any) => void;
declare function logMethod1(params?: string): (target: any, attrName: any, desc: any) => void;
declare function logMethod2(params?: string): (target: any, attrName: any, desc: any) => void;
declare function logParams1(params?: string): (target: any, attrName: any, desc: any) => void;
declare function logParams2(params?: string): (target: any, attrName: any, desc: any) => void;
declare class HttpClient {
    apiUrl: string | undefined;
    getData(): boolean;
    setData(attr1: any, attr2: any): void;
}
declare const http: any;
