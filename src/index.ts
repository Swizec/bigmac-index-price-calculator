// January 2019 Big Mac Index
import BigMacIndex from "./BigMacIndex.json";

export class ParityPrice {
    ipstack_key: string;

    constructor(ipstack_key: string) {
        this.ipstack_key = ipstack_key;
    }

    private async ipstack(ip: string) {
        const res = await fetch(
            `https://api.ipstack.com/${ip}?access_key=${this.ipstack_key}`
        );
        return res.json();
    }

    async price(USAprice: number): Promise<number> {
        console.log(await this.ipstack("134.201.250.155"));
        return 0;
    }
}

// export function parityPrice(USAprice: number): number {
//     const pricePerBurger = USAprice / BigMacIndex["United States"];

//     return pricePerBurger * BigMacIndex[country];
// }
