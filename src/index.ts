// January 2019 Big Mac Index
const BigMacIndex = require("./BigMacIndex.json");
const fetch = require("isomorphic-fetch");

export default class ParityPrice {
    ipstack_key: string;

    constructor(ipstack_key: string) {
        this.ipstack_key = ipstack_key;
    }

    private async ipstack() {
        const res = await fetch(
            `http://api.ipstack.com/check?access_key=${this.ipstack_key}`
        );
        return res.json();
    }

    async price(USAprice: number): Promise<number> {
        const location = await this.ipstack();
        const pricePerBurger = USAprice / BigMacIndex["United States"];

        if (location.country_name in BigMacIndex) {
            return pricePerBurger * BigMacIndex[location.country_name];
        }

        return USAprice;
    }
}
