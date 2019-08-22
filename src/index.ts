// January 2019 Big Mac Index

const fetch = require("isomorphic-fetch");

export const BigMacIndex = {
    Switzerland: 6.62,
    Norway: 5.86,
    Sweden: 5.84,
    "United States": 5.58,
    Canada: 5.08,
    "Euro area": 4.64,
    Denmark: 4.6,
    Israel: 4.58,
    Brazil: 4.55,
    Australia: 4.35,
    Lebanon: 4.31,
    Uruguay: 4.31,
    Singapore: 4.28,
    "New Zealand": 4.19,
    Britain: 4.07,
    "South Korea": 4.02,
    Chile: 3.89,
    "United Arab Emirates": 3.81,
    "Czech Republic": 3.81,
    "Costa Rica": 3.77,
    Colombia: 3.73,
    Thailand: 3.72,
    Japan: 3.6,
    Honduras: 3.49,
    Kuwait: 3.46,
    Pakistan: 3.31,
    Qatar: 3.3,
    Croatia: 3.24,
    Guatemala: 3.23,
    "Saudi Arabia": 3.2,
    Bahrain: 3.18,
    Nicaragua: 3.18,
    "Sri Lanka": 3.18,
    Peru: 3.14,
    China: 3.05,
    Hungary: 3.03,
    Vietnam: 2.8,
    Poland: 2.8,
    Jordan: 2.75,
    Oman: 2.73,
    Philippines: 2.67,
    India: 2.55,
    "Hong Kong": 2.55,
    Mexico: 2.54,
    Indonesia: 2.34,
    Azerbaijan: 2.33,
    Moldova: 2.32,
    Romania: 2.29,
    Taiwan: 2.24,
    "South Africa": 2.24,
    Egypt: 2.23,
    Malaysia: 2.2,
    Argentina: 2,
    Turkey: 2,
    Ukraine: 1.94,
    Russia: 1.65
};

export class ParityPrice {
    ipstack_key: string;
    cache: { [key: string]: any };

    constructor(ipstack_key: string) {
        this.ipstack_key = ipstack_key;
        this.cache = {};
    }

    private async ipstack(IP?: string) {
        const param = IP ? IP : "check";

        if (!this.cache[param]) {
            const res = await fetch(
                `http://api.ipstack.com/${param}?access_key=${this.ipstack_key}`
            );
            this.cache[param] = await res.json();
        }

        return this.cache[param];
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
