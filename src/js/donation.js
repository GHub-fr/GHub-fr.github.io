main();

async function main() {
    await include_script("/src/js/gather.js");

    setTokenData("BTC", "€", "EUR");
    setTokenData("ETH", "€", "EUR");
    setTokenData("XRP", "€", "EUR");
    setTokenData("ADA", "$", "USD");
    setTokenData("USDT", "$", "USD");
}

async function setTokenData(token, devise, deviseType) {
    var price = await getPrice(token, deviseType);
    setData(token, price, devise);
}

function setData(id, data, devise, deviseType) {
    var elem = document.getElementById("prix-" + id);
    elem.textContent = data +" "+ devise;
}

async function getPrice(token, deviseType) {
    var x = await gather('https://api.blockchain.com/v3/exchange/tickers/' + token + "-" + deviseType);
    return getValue(x, "last_trade_price");
    return 0;
} 