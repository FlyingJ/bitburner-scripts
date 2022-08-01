/** @param {NS} ns */
export async function main(ns) {
	var MoneyList = [];
	var Moneylist_counter = 0;
	var StartTime = Date.now();
	var StartMoney = ns.getPlayer().money;
	ns.disableLog("sleep");
	ns.disableLog("stock.buy");
	ns.disableLog("stock.sell");
	var sym = ns.stock.getSymbols();

	for (var t = 0; t < sym.length; ++t) {
		StartMoney += ns.stock.getPosition(sym[t])[0] * ns.stock.getPrice(sym[t]);
	}

	while (true) {
		var MoneyCalc = Math.max(tendStocks(ns, sym) - StartMoney, 1);
		var TimeCalc = (Date.now() - StartTime) / 1000;
		var AvgMoney = MoneyCalc / TimeCalc;

		//		ns.print(" Avg.Moneyflow  : ",ns.nFormat(AvgMoney,"0.000a")," pr.sec");
		var TimeActivecalc = (Date.now() - StartTime) / 1000;
		var TimeActiveString = "";
		if (TimeActivecalc > 120) {
			TimeActiveString = Math.trunc(TimeActivecalc / 60) + " Minutes";
		}
		else
			TimeActiveString = Math.trunc(TimeActivecalc) + " Seconds";

		ns.print(" Total income this session : ", ns.nFormat(MoneyCalc, "0.000a"), " over ", TimeActiveString);

		await ns.sleep(1 * 2 * 1000);
	}
}

function tendStocks(ns, sym) {
	ns.clearLog();
	//	ns.tprint(sym[t], "─────────────────────────────────");
	ns.print("┌────────────┬─────────┬──────────┬────────────┐");
	ns.print("│ Forecast   │  Sym    │  Value   │  % Owned   │");
	ns.print("├────────────┼─────────┼──────────┼────────────┤");
	var totalval = 0;
	//if( (ns.getPlayer().money-5000000) > 1000000000)
	//	BuyBestStock(ns, sym );


	for (var t = 0; t < sym.length; ++t) {
		if (ns.stock.getForecast(sym[t]) > 0.60) {
			//ns.tprint(sym[t], " over 0.60 : ");
			if (ns.stock.getMaxShares(sym[t]) > ns.stock.getPosition(sym[t])[0]) {
				// do we have money ?  if enough -> buy more
				if ((ns.getPlayer().money - 5000000) > 1000000) {
					var nrBuyShares = Math.trunc((ns.getPlayer().money) / ns.stock.getPrice(sym[t])) * 0.5;
					//ns.tprint(sym[t], " Math.trunc("+ns.getPlayer().money+" / "+ns.stock.getPrice(sym[t])+" )*0.5 =  "+nrBuyShares);
					nrBuyShares = Math.min(ns.stock.getMaxShares(sym[t]), nrBuyShares);
					//ns.tprint(sym[t], " buying ["+nrBuyShares+"] shares");

					buy(ns, sym[t], nrBuyShares);
				}
				//else	ns.tprint(sym[t], " out of money ?");

			}

			//	else		ns.tprint(sym[t], " no more shares");
		}
		else  // do we have shares in this trainwreck ?
		{
			var nrShares = ns.stock.getPosition(sym[t])[0];
			if (nrShares > 0) {  // yes -> sell it all
				ns.stock.sell(sym[t], nrShares, 1);
				BuyBestStock(ns, sym);
			}
		}
		if (ns.stock.getPosition(sym[t])[0] > 0) {
			var pCalc = Math.trunc(ns.stock.getForecast(sym[t]) * 100);
			var output = "";
			var outputShares = "";
			pCalc -= 60;

			var maxshares = ns.stock.getMaxShares(sym[t]);
			var gotshares = ns.stock.getPosition(sym[t])[0];
			var sharesPercent = gotshares / maxshares * 10;
			for (var t3 = 0; t3 < 10; ++t3) {
				if (sharesPercent > (t3 * 1))
					outputShares += "█";
				else
					outputShares += "░";
			}
			for (var t2 = 0; t2 < 10; ++t2) {
				if (pCalc > (t2 * 1))
					output += "█";
				else
					output += "░";
			}
			totalval += ns.stock.getPosition(sym[t])[0] * ns.stock.getPrice(sym[t]);
			ns.print("│ ", output, " │ [", FixSym(sym[t]),
				"] │",
				ReadableNumber(ns.stock.getPosition(sym[t])[0] * ns.stock.getPrice(sym[t])), " | ",
				outputShares, " │"
				//,ns.nFormat(ns.stock.getSaleGain(sym[t],ns.stock.getPosition( sym[t] )[0],"L"),"$0.000a")
			);
		}
	}

	ns.print("└────────────┴─────────┴──────────┴────────────┘");
	ns.print(" Value (shares) : " + ReadableNumber(totalval), "  Total values : ", ReadableNumber(totalval + ns.getPlayer().money));
	return totalval + ns.getPlayer().money;
}

function BuyBestStock(ns, sym) {
	var sym_t = GetBestForecast(ns, sym);
	if (sym_t == -1) return;
	var nrBuyShares = (ns.getPlayer().money - 5000000) / ns.stock.getPrice(sym[sym_t]) * 0.66;
	nrBuyShares = Math.min(ns.stock.getMaxShares(sym[sym_t], nrBuyShares));
	if (nrBuyShares > 0)
		buy(ns, sym[sym_t], nrBuyShares);
}

function GetBestForecast(ns, symbols) {
	var s_val = 0.0;
	var sym = -1;

	for (var t = 0; t < symbols.length; ++t) {
		var v = ns.stock.getForecast(symbols[t]);
		if (v > s_val) {
			if (v > 0.60) {
				if (ns.stock.getMaxShares(symbols[t]) > ns.stock.getPosition(symbols[t])[0]) {
					s_val = v;
					sym = t;
				}
				else {
					//					ns.print("Best stock sold out");
				}
			}
		}
	}
	//ns.print("best stock : ",symbols[sym], " : ",s_val);
	return sym;
}

function FixSym(result) {
	var nr2 = result.length;
	var res2 = "";
	for (var t = 0; t < 5 - nr2; ++t)
		res2 = " " + res2;
	return res2 + result;
}

function FixResultSpace(nr, result) {
	var nr2 = result.length;
	var res2 = "";
	for (var t = 0; t < 9 - nr2; ++t)
		res2 = " " + res2;
	return res2 + result;
}

function ReadableNumber(nr) {
	var result;
	if (nr > 1000000000000) {
		result = nr / 1000000000000;
		return FixResultSpace(nr, result.toFixed(2) + "t");
	}
	if (nr > 1000000000) {
		result = nr / 1000000000;
		return FixResultSpace(nr, result.toFixed(2) + "b");
	}
	if (nr > 1000000) {
		result = nr / 1000000;
		return FixResultSpace(nr, result.toFixed(2) + "m");
	}
	if (nr > 1000) {
		result = nr / 1000;
		return FixResultSpace(nr, result.toFixed(2) + "k");
	}
	return "x";
}

function buy(ns, stockname, numShares) {
	//ns.tprint("BUYING [",stockname,"] [",numShares,"]");
	ns.stock.buy(stockname, numShares);
}