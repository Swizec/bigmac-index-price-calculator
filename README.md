# Big Mac Index Price Calculator 🍔

The Big Mac Index is a purchasing power parity index published by The Economist. It aims to compare purchasing power across the world using the price of a Big Mac.

This library makes it easy to use big mac purchasing power parity in your projects.

You'll need an [ipstack](https://ipstack.com/) API key. Free tier will do just fine. The library uses it to geolocate your users and calculate a fair price based on your American price.

By default there is no currency conversion. Prices come back in USD, adjusted for purchasing power.

The library is designed so it doesn't break server-side rendering. ✌️

## How to use 🍔

```bash
yarn add bigmac-index-price-calculator
```

Install `bigmac-index-price-calculator`

```javascript
import ParityPrice from "./index";

const parity = new ParityPrice(`<your api key>`);
const fairPrice = await parity.price(149)
```

`fairPrice` now contains the fair price for your product.

### Displaying location

You might want to tell your users that prices have been adjusted for purchasing power parity. Set the meta flag to include the full response from ipstack.

```javascript
import ParityPrice from "./index";

const parity = new ParityPrice(`<your api key>`);
const { fairPrice, locationData } = await parity.price(149)
```

This includes currency information, if you have a paid ipstack API key.

### Custom IP

# License

MIT