const TICK = 3000;
const MAXWAIT = 43200; // 12 hours in seconds
const BASEMAXEARNINGS = 9171;

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	let cost = ns.hacknet.getPurchaseNodeCost();
	while (canRecoup(ns, cost)) {
		while (!affordable(ns, cost)) { await ns.sleep(TICK); }
		buyNode(ns);
		cost = ns.hacknet.getPurchaseNodeCost();
	}

	ns.print("Additional hacknet nodes cannot break even");
}

function canRecoup(ns, cost) {
	// will a fully upgraded node be able to pay for itself within 12 hours?
	const maxEarnings = BASEMAXEARNINGS * hacknetMultProd(ns);

	if (breakEvenTime(cost, maxEarnings) < MAXWAIT) return true;
	return false;
}

function hacknetMultProd(ns) { return ns.getHacknetMultipliers().production; }

function breakEvenTime(cost, earnings) { return cost / earnings; }

function affordable(ns, cost) {
	if (cost < moneyAvailable(ns)) return true;
	return false;
}

function moneyAvailable(ns) { return ns.getServerMoneyAvailable('home'); }

function buyNode(ns) { ns.print("Purchased hacknet-node-" + ns.hacknet.purchaseNode()); }