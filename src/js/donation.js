main();

async function main() {
    await include_script("/src/js/gather.js");

    var deviseType = "USD";
    var devise = "$";

    setTokenData("BTC", devise, deviseType);
    setTokenData("ETH", devise, deviseType);
    setTokenData("XMR", devise, deviseType);
    setTokenData("XRP", devise, deviseType);
    setTokenData("ADA", devise, deviseType);
    setTokenData("USDT", devise, deviseType);
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
    var price = getValue(x, "last_trade_price");
    if(price !== undefined){
       return getValue(x, "last_trade_price");
    }
    else {
        return "...";
    }
}