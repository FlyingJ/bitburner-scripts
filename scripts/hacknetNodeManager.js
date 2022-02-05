const TICK = 3000;
const MAXWAIT = 3600 * 12; // 12 hours in seconds
const BASEMAXEARNINGS = 9171;

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	const maxEarnings = BASEMAXEARNINGS * hacknetMultProd(ns);
	let cost = ns.hacknet.getPurchaseNodeCost();
	while (canRecoup(ns, cost, maxEarnings)) {
		while (!affordable(ns, cost)) { await ns.sleep(TICK); }
		buyNode(ns);
		cost = ns.hacknet.getPurchaseNodeCost();
	}

	ns.print("Additional hacknet nodes cannot break even");
}

function canRecoup(ns, cost, maxEarnings) { return breakEvenTime(cost, maxEarnings) < MAXWAIT ? true : false; }
function hacknetMultProd(ns) { return ns.getHacknetMultipliers().production; }
function breakEvenTime(cost, earnings) { return cost / earnings; }
function affordable(ns, cost) { return cost < moneyAvailable(ns) ? true : false; }
function moneyAvailable(ns) { return ns.getServerMoneyAvailable('home'); }
function buyNode(ns) { ns.print("Purchased hacknet-node-" + ns.hacknet.purchaseNode()); }