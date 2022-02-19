const TICK = 5 * 1000; // seconds in millis
const BUYTHRESH = 0.53; // 55% or better growth forecast to buy
const LOSSTHRESH = -0.007; // 5% loss triggers sell
const ROITHRESH = 0.10; // 25% or better profit
const CASHFLOOR = 10e6; // have 10.000m to do other stuff with

/** @param {NS} ns **/
export async function main(ns) {
	// ensure access to necessary APIs
	if (!haveAPIAccess(ns)) {
		ns.tprint(`Not haz API accesses`);
		return;
	}

	await stockManager(ns);
}

function haveAPIAccess(ns) { return (haveTIXAccess(ns) && have4SDataAccess(ns)); }
function haveTIXAccess(ns) { return ns.stock.getSymbols; }
function have4SDataAccess(ns) { return ns.stock.getForecast; }

async function stockManager(ns, funding) {
	const symbols = ns.stock.getSymbols();
	while (true) {
		// dump everything
		let marketData = getMarketData(ns, symbols);
		//ns.print(marketData.sort((a, b) => b.earnings - a.earnings));

		// look at what else is available for purchase
		let noHoldings = marketData.filter(haveNoShares);
		//ns.print(noHoldings.filter(haveNegativeForecast).sort((a, b) => b.forecast - a.forecast));
		let projectedWinners = noHoldings.filter(havePositiveForecast);
		buyStocks(ns, projectedWinners);

		// look at what we have for wheat, chaff
		let myHoldings = marketData.filter(haveShares);
		//ns.print(myHoldings.sort((a, b) => b.earnings - a.earnings));
		let projectedLosers = myHoldings.filter(haveNegativeForecast);
		sellStocks(ns, projectedLosers);
		let actualLosers = myHoldings.filter(haveSufficientLosses);
		sellStocks(ns, actualLosers);
		let breadWinners = myHoldings.filter(haveSufficientROI);
		//ns.print(breadWinners);
		sellStocks(ns, breadWinners);

		/*
		ns.tprintf(`\n=========================== HOLDINGS ============================\n`);
		ns.tprint(myHoldings);
		ns.tprint(`=========================== TO BUY ==========================`);
		ns.tprint(stuffToBuy);
		ns.tprint(`=========================== TO SELL ==========================`);
		ns.tprint(stuffToSell);
		*/

		await ns.sleep(TICK);
	}
}

function sellStocks(ns, marketData) {
	for (let symbolData of marketData) {
		sellStock(ns, symbolData);
	}
}

function sellStock(ns, symbolData) {
	let symbol = symbolData.symbol;
	let shares = symbolData.shares;
	ns.stock.sell(symbol, shares);
}

function buyStocks(ns, marketData) {
	for (let symbolData of marketData) {
		buyStock(ns, symbolData);
	}
}

function buyStock(ns, symbolData) {
	let symbol = symbolData.symbol;
	let availableFunds = myMoney(ns) - CASHFLOOR;
	if (availableFunds < 0) { return; }
	let maxShares = ns.stock.getMaxShares(symbol);
	let sharesAfforded = availableFunds / ns.stock.getPrice(symbol);
	let sharesToBuy = sharesAfforded > maxShares ? maxShares : sharesAfforded;
	ns.stock.buy(symbol, sharesToBuy);
}

function haveNoShares(symbolData, symbolIndex, marketData) { return symbolData.shares < 1; }
function haveShares(symbolData, symbolIndex, marketData) { return symbolData.shares > 0; }
function havePositiveForecast(symbolData, symbolIndex, marketData) { return symbolData.forecast > BUYTHRESH; }
function haveNegativeForecast(symbolData, symbolIndex, marketData) { return symbolData.forecast < 0.50; }
function havePositiveGrowth(symbolData, symbolIndex, marketData) { return symbolData.earnings > 0; }
function haveSufficientROI(symbolData, symbolIndex, marketData) { return symbolData.earnings > ROITHRESH; }
function haveSufficientLosses(symbolData, symbolIndex, marketData) { return symbolData.earnings < LOSSTHRESH; }

function getMarketData(ns, symbols) {
	let marketData = [];
	for (let symbol of symbols) { marketData.push(getSymbolData(ns, symbol)); }
	return marketData;
}

function getSymbolData(ns, symbol) {
	let position = ns.stock.getPosition(symbol);
	let shares = position[0];
	let average = position[1];
	let currentAverage = ns.stock.getPrice(symbol);
	let earnings = (currentAverage - average) / average;
	let forecast = ns.stock.getForecast(symbol);
	let symbolData = {
		'symbol': symbol,
		'shares': shares,
		'average': average,
		'currentAverage': currentAverage,
		'earnings': earnings,
		'forecast': forecast,
	};
	return symbolData;
}

function myMoney(ns) {
	return ns.getServerMoneyAvailable(`home`);
}