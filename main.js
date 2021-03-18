//proxy
const proxy = require("node-global-proxy").default;
proxy.setConfig({
    http: "http://localhost:10809",
    https: "http://localhost:10809",
});
proxy.start();

//api
const Binance = require("binance-api-node").default

// Authenticated client, can make signed calls
const client = Binance(require("./config.json"))

//delay
const delay = require("await-delay")

async function main() {
    while (true) {
        client.order({
            symbol: "LINAUSDT",
            side: "BUY",
            quantity: "100",
            price: "0.1",
        }).then(result => {
            console.log("succeed!")
            console.log(result)
            process.exit()
        }).catch(e => {
            console.log(e.message)
        })

        //api limit: 100 order per 10 second
        await delay(125)
    }
}

main()
