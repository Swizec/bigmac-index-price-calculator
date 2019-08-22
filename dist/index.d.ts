export default class ParityPrice {
    ipstack_key: string;
    cache: {
        [key: string]: any;
    };
    constructor(ipstack_key: string);
    private ipstack;
    private _price;
    price(USAprice: number, IP?: string): Promise<number>;
    priceWithLocation(USAprice: number, IP?: string): Promise<{
        fairPrice: number;
        location: any;
    }>;
}
