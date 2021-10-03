let getRate = async (currency1, currency2, date) => {
	while (true){
		try{
			let response = await fetch(`https://api.codetabs.com/v1/proxy?quest=https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest/${date}/currencies/${currency1}.json`);
			let json = await response.json();
			return json[currency1][currency2];
		}catch(err){
			continue;
		}
	}
}

let getImgUpOrDown = async (currency1, currency2) => {
	let dateBefore = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10);
	let rateToday =  await getRate(currency1, currency2, "latest");
	let rateBefore = await getRate(currency1, currency2, dateBefore)
	if (rateToday >= rateBefore){
		return '<img src="img/arrow-up.svg" width=40%> </img>';
	}else if(rateToday < rateBefore){
		return '<img src="img/arrow-down.svg" width=40%> </img>';
	}

}


let insertRate = async (currencyElements) => {
	
	let currencyRealName = [];
	for(let i of currencyElements.keys()){
		currencyRealName.push(i);
	}
	
	let currencyCryptoName = [];
	for(let i of currencyElements.get("usd").keys()){
		currencyCryptoName.push(i);
	}

	for(let i=0; i<2; i++){
		for(let j=0; j<4; j++){
			//let resolve = `${parseInt(await getRate(currencyCryptoName[j], currencyRealName[i], "latest"))} ${await getImgUpOrDown(currencyCryptoName[j], currencyRealName[i])}`;
			console.log(currencyCryptoName[j]);
			console.log(currencyRealName[i]);
			let resolve = await getImgUpOrDown(currencyCryptoName[j], currencyRealName[i]);
			console.log(i);
			currencyElements.get(currencyRealName[i]).get(currencyCryptoName[j]).innerHTML = await resolve;
		}
	}
}


let currencyElements = new Map([
	["usd" , new Map([
		["usdt", document.getElementById("USDT_USD")],
		["btc", document.getElementById("BTC_USD")],
		["eth", document.getElementById("ETH_USD")],
		["ltc", document.getElementById("LTC_USD")]
	])],
	["uah" , new Map([
		["usdt", document.getElementById("USDT_UAH")],
		["btc", document.getElementById("BTC_UAH")],
		["eth", document.getElementById("ETH_UAH")],
		["ltc", document.getElementById("LTC_UAH")]
	])]
]);

insertRate(currencyElements);
