// January 2019 Big Mac Index
const BigMacIndex = require("./BigMacIndex.json");
const fetch = require("isomorphic-fetch");

export default class ParityPrice {
    ipstack_key: string;

    constructor(ipstack_key: string) {
        this.ipstack_key = ipstack_key;
    }

    private async ipstack(IP?: string) {
        const res = await fetch(
            `http://api.ipstack.com/${IP ? IP : "check"}?access_key=${
                this.ipstack_key
            }`
        );
        return res.json();
    }

    private _price(USAprice: number, location: any): number {
        const pricePerBurger = USAprice / BigMacIndex["United States"];

        let fairPrice = USAprice;

        if (location.country_name in BigMacIndex) {
            fairPrice = Math.round(
                pricePerBurger * BigMacIndex[location.country_name]
            );
        } else if (location.continent_code === "EU") {
            fairPrice = Math.round(pricePerBurger * BigMacIndex["Euro area"]);
        } else if (location.continent_code === "AS") {
            fairPrice = Math.round(pricePerBurger * BigMacIndex["Vietnam"]);
        } else if (location.continent_code === "AF") {
            fairPrice = Math.round(pricePerBurger * BigMacIndex["Egypt"]);
        } else if (location.continent_code === "SA") {
            fairPrice = Math.round(pricePerBurger * BigMacIndex["Brazil"]);
        }

        return fairPrice;
    }

    async price(USAprice: number, IP?: string): Promise<number> {
        const location = await this.ipstack(IP);
        const fairPrice = this._price(USAprice, location);

        return fairPrice;
    }

    async priceWithLocation(
        USAprice: number,
        IP?: string
    ): Promise<{ fairPrice: number; location: any }> {
        const location = await this.ipstack(IP);

        const fairPrice = this._price(USAprice, location);

        return { fairPrice, location: location };
    }
}
