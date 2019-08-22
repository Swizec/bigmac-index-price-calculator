import ParityPrice from "./index";
import * as fetchMock from "isomorphic-fetch";

describe("ParityPrice", () => {
    beforeEach(() => {
        fetchMock.reset();
    });
    test("init", () => {
        expect(
            () => new ParityPrice("cb952dd732eb8e511d44d441788fcf67")
        ).not.toThrow();
    });

    test("returns same price for USA", async () => {
        fetchMock.mock(
            "http://api.ipstack.com/check?access_key=cb952dd732eb8e511d44d441788fcf67",
            {
                body: {
                    ip: "67.188.8.242",
                    type: "ipv4",
                    continent_code: "NA",
                    continent_name: "North America",
                    country_code: "US",
                    country_name: "United States",
                    region_code: "CA",
                    region_name: "California",
                    city: "San Francisco",
                    zip: "94110",
                    latitude: 37.7506,
                    longitude: -122.4121,
                    location: {
                        geoname_id: null,
                        capital: "Washington D.C.",
                        languages: [[Object]],
                        country_flag: "http://assets.ipstack.com/flags/us.svg",
                        country_flag_emoji: "🇺🇸",
                        country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
                        calling_code: "1",
                        is_eu: false
                    }
                },
                status: 200
            }
        );

        const parity = new ParityPrice("cb952dd732eb8e511d44d441788fcf67");
        await expect(parity.price(149)).resolves.toBe(149);
    });
});
