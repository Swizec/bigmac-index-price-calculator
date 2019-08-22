import ParityPrice from "./index";
import * as fetchMock from "isomorphic-fetch";

const URL =
    "http://api.ipstack.com/check?access_key=cb952dd732eb8e511d44d441788fcf67";

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
        fetchMock.mock(URL, {
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
        });

        const parity = new ParityPrice("cb952dd732eb8e511d44d441788fcf67");
        await expect(parity.price(149)).resolves.toBe(149);
    });

    test("returns Japan price for Japan", async () => {
        fetchMock.mock(URL, {
            status: 200,
            body: {
                ip: "1.33.213.230",
                type: "ipv4",
                continent_code: "AS",
                continent_name: "Asia",
                country_code: "JP",
                country_name: "Japan",
                region_code: "13",
                region_name: "Tokyo",
                city: "Tokyo",
                zip: "100-6801",
                latitude: 35.688838958740234,
                longitude: 139.7628631591797,
                location: {
                    geoname_id: 1850147,
                    capital: "Tokyo",
                    languages: [
                        {
                            code: "ja",
                            name: "Japanese",
                            native: "\u65e5\u672c\u8a9e"
                        }
                    ],
                    country_flag: "http://assets.ipstack.com/flags/jp.svg",
                    country_flag_emoji: "\ud83c\uddef\ud83c\uddf5",
                    country_flag_emoji_unicode: "U+1F1EF U+1F1F5",
                    calling_code: "81",
                    is_eu: false
                }
            }
        });

        const parity = new ParityPrice("cb952dd732eb8e511d44d441788fcf67");
        await expect(parity.price(149)).resolves.toBe(96);
    });

    test("uses euro zone for europe", async () => {
        fetchMock.mock(URL, {
            status: 200,
            body: {
                ip: "193.77.212.100",
                type: "ipv4",
                continent_code: "EU",
                continent_name: "Europe",
                country_code: "SI",
                country_name: "Slovenia",
                region_code: "061",
                region_name: "Ljubljana",
                city: "Ljubljana",
                zip: "1000",
                latitude: 46.051429748535156,
                longitude: 14.505970001220703,
                location: {
                    geoname_id: 3196359,
                    capital: "Ljubljana",
                    languages: [
                        {
                            code: "sl",
                            name: "Slovenian",
                            native: "Sloven\u0161\u010dina"
                        }
                    ],
                    country_flag: "http://assets.ipstack.com/flags/si.svg",
                    country_flag_emoji: "\ud83c\uddf8\ud83c\uddee",
                    country_flag_emoji_unicode: "U+1F1F8 U+1F1EE",
                    calling_code: "386",
                    is_eu: true
                }
            }
        });

        const parity = new ParityPrice("cb952dd732eb8e511d44d441788fcf67");
        await expect(parity.price(149)).resolves.toBe(124);
    });

    test("uses Vietnam as placeholder for Asian countries", async () => {
        fetchMock.mock(URL, {
            status: 200,
            body: {
                ip: "90.143.31.5",
                type: "ipv4",
                continent_code: "AS",
                continent_name: "Asia",
                country_code: "KZ",
                country_name: "Kazakhstan",
                region_code: "AST",
                region_name: "Nur-Sultan",
                city: "Nur-Sultan",
                zip: null,
                latitude: 51.16667175292969,
                longitude: 71.44999694824219,
                location: {
                    geoname_id: 1526273,
                    capital: "Astana",
                    languages: [
                        {
                            code: "kk",
                            name: "Kazakh",
                            native: "\u049a\u0430\u0437\u0430\u049b\u0448\u0430"
                        },
                        {
                            code: "ru",
                            name: "Russian",
                            native: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439"
                        }
                    ],
                    country_flag: "http://assets.ipstack.com/flags/kz.svg",
                    country_flag_emoji: "\ud83c\uddf0\ud83c\uddff",
                    country_flag_emoji_unicode: "U+1F1F0 U+1F1FF",
                    calling_code: "76,77",
                    is_eu: false
                }
            }
        });

        const parity = new ParityPrice("cb952dd732eb8e511d44d441788fcf67");
        await expect(parity.price(149)).resolves.toBe(75);
    });

    test("uses Egypt as placeholder for African countries", async () => {
        fetchMock.mock(URL, {
            status: 200,
            body: {
                ip: "41.184.24.183",
                type: "ipv4",
                continent_code: "AF",
                continent_name: "Africa",
                country_code: "NG",
                country_name: "Nigeria",
                region_code: "LA",
                region_name: "Lagos",
                city: "Lagos",
                zip: "100002",
                latitude: 6.4351301193237305,
                longitude: 3.416059970855713,
                location: {
                    geoname_id: 2332459,
                    capital: "Abuja",
                    languages: [
                        { code: "en", name: "English", native: "English" }
                    ],
                    country_flag: "http://assets.ipstack.com/flags/ng.svg",
                    country_flag_emoji: "\ud83c\uddf3\ud83c\uddec",
                    country_flag_emoji_unicode: "U+1F1F3 U+1F1EC",
                    calling_code: "234",
                    is_eu: false
                }
            }
        });

        const parity = new ParityPrice("cb952dd732eb8e511d44d441788fcf67");
        await expect(parity.price(149)).resolves.toBe(60);
    });

    test("uses Brazil as placeholder for South American countries", async () => {
        fetchMock.mock(URL, {
            status: 200,
            body: {
                ip: "64.116.135.48",
                type: "ipv4",
                continent_code: "SA",
                continent_name: "South America",
                country_code: "VE",
                country_name: "Venezuela",
                region_code: "A",
                region_name: "Distrito Federal",
                city: "Caracas",
                zip: "1010",
                latitude: 10.498499870300293,
                longitude: -66.9009017944336,
                location: {
                    geoname_id: 3646738,
                    capital: "Caracas",
                    languages: [
                        { code: "es", name: "Spanish", native: "Espa\u00f1ol" }
                    ],
                    country_flag: "http://assets.ipstack.com/flags/ve.svg",
                    country_flag_emoji: "\ud83c\uddfb\ud83c\uddea",
                    country_flag_emoji_unicode: "U+1F1FB U+1F1EA",
                    calling_code: "58",
                    is_eu: false
                }
            }
        });

        const parity = new ParityPrice("cb952dd732eb8e511d44d441788fcf67");
        await expect(parity.price(149)).resolves.toBe(121);
    });
});
