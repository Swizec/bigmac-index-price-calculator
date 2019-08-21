export declare class ParityPrice {
    ipstack_key: string;
    constructor(ipstack_key: string);
    private ipstack;
    price(USAprice: number): Promise<number>;
}
