!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.bigmacIndexPriceCalculator={})}(this,function(e){var n=require("isomorphic-fetch"),a={Switzerland:6.62,Norway:5.86,Sweden:5.84,"United States":5.58,Canada:5.08,"Euro area":4.64,Denmark:4.6,Israel:4.58,Brazil:4.55,Australia:4.35,Lebanon:4.31,Uruguay:4.31,Singapore:4.28,"New Zealand":4.19,Britain:4.07,"South Korea":4.02,Chile:3.89,"United Arab Emirates":3.81,"Czech Republic":3.81,"Costa Rica":3.77,Colombia:3.73,Thailand:3.72,Japan:3.6,Honduras:3.49,Kuwait:3.46,Pakistan:3.31,Qatar:3.3,Croatia:3.24,Guatemala:3.23,"Saudi Arabia":3.2,Bahrain:3.18,Nicaragua:3.18,"Sri Lanka":3.18,Peru:3.14,China:3.05,Hungary:3.03,Vietnam:2.8,Poland:2.8,Jordan:2.75,Oman:2.73,Philippines:2.67,India:2.55,"Hong Kong":2.55,Mexico:2.54,Indonesia:2.34,Azerbaijan:2.33,Moldova:2.32,Romania:2.29,Taiwan:2.24,"South Africa":2.24,Egypt:2.23,Malaysia:2.2,Argentina:2,Turkey:2,Ukraine:1.94,Russia:1.65},t=function(e,n){void 0===n&&(n=!1),this.ipstack_key=e,this.cache={},this.enableSSL=n};t.prototype.ipstack=function(e){try{var a=this;function t(){return a.cache[r]}var r=e||"check",i=function(){if(!a.cache[r])return Promise.resolve(n("http"+(a.enableSSL?"s":"")+"://api.ipstack.com/"+r+"?access_key="+a.ipstack_key)).then(function(e){return Promise.resolve(e.json()).then(function(e){a.cache[r]=e})})}();return i&&i.then?i.then(t):t()}catch(e){return Promise.reject(e)}},t.prototype._price=function(e,n){var t=e/a["United States"],r=e;return n.country_name in a?r=Math.round(t*a[n.country_name]):"EU"===n.continent_code?r=Math.round(t*a["Euro area"]):"AS"===n.continent_code?r=Math.round(t*a.Vietnam):"AF"===n.continent_code?r=Math.round(t*a.Egypt):"SA"===n.continent_code&&(r=Math.round(t*a.Brazil)),r},t.prototype.price=function(e,n){try{var a=this;return Promise.resolve(a.ipstack(n)).then(function(n){return a._price(e,n)})}catch(e){return Promise.reject(e)}},t.prototype.priceWithLocation=function(e,n){try{var a=this;return Promise.resolve(a.ipstack(n)).then(function(n){return{fairPrice:a._price(e,n),location:n}})}catch(e){return Promise.reject(e)}},e.BigMacIndex=a,e.ParityPrice=t});
//# sourceMappingURL=index.umd.js.map
