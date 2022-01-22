const TICK = 3000;
const MAXWAIT = 43200; // 12 hours in seconds
const BASEMAXEARNINGS = 9171;

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	// as I understand, hacknet multipliers only change with augmentation
	// only need to calculate max node earnings once
	const maxNodeEarnings = BASEMAXEARNINGS * hacknetMultProd(ns);

	let cost = ns.hacknet.getPurchaseNodeCost();
	while (canRecoup(ns, cost, maxNodeEarnings)) {
		while (!affordable(ns, cost)) { await ns.sleep(TICK); }
		buyNode(ns);
		cost = ns.hacknet.getPurchaseNodeCost();
	}

	ns.print("Additional hacknet nodes cannot break even");
}

function hacknetMultProd(ns) { return ns.getHacknetMultipliers().production; }

function canRecoup(ns, cost, maxEarnings) {
	return (breakEvenTime(cost, maxEarnings) < MAXWAIT) ? true : false;
}

function breakEvenTime(cost, earnings) { return cost / earnings; }

function affordable(ns, cost) {
	if (cost < moneyAvailable(ns)) return true;
	return false;
}

function moneyAvailable(ns) { return ns.getServerMoneyAvailable('home'); }

function buyNode(ns) { ns.print("Purchased hacknet-node-" + ns.hacknet.purchaseNode()); }


/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

export function upgradesAvailable(ns, node) {
	if (levelAvailable(ns, node) || ramAvailable(ns, node) || coreAvailable(ns, node)) {
		return true;
	}
	return false;
}

function levelAvailable(ns, node) {
	if(isFinite(ns.hacknet.getLevelUpgradeCost(node, 1))) return true;
	return false;
}

function ramAvailable(ns, node) {
		if(isFinite(ns.hacknet.getRamUpgradeCost(node, 1))) return true;
	return false;
}

function coreAvailable(ns, node) {
		if(isFinite(ns.hacknet.getCoreUpgradeCost(node, 1))) return true;
	return false;
}

export function leastCostlyUpgrade(ns, node) {
	let minCost = ns.hacknet.getLevelUpgradeCost(node, 1);
	let upgradeType = "level";

	let ramCost = ns.hacknet.getRamUpgradeCost(node, 1);
	if (ramCost < minCost) {
		minCost = ramCost;
		upgradeType = "ram";
	}

	var coreCost = ns.hacknet.getCoreUpgradeCost(node, 1);
	if (coreCost < minCost) {
		minCost = coreCost;
		upgradeType = "core";
	}

	if (isFinite(minCost)) {
		return upgradeType;
	} else {
		return null;
	}
}

export function isAffordable(ns, node, upgrade) {
	if (cost(ns, node, upgrade) < moneyAvailable(ns)) { return true; }
	return false;
}

function cost(ns, node, upgrade) {
	switch (upgrade) {
		case "ram":
			return ns.hacknet.getRamUpgradeCost(node, 1);
		case "core":
			return ns.hacknet.getCoreUpgradeCost(node, 1);
		default:
			return ns.hacknet.getLevelUpgradeCost(node, 1);
	}
}

export function buyUpgrade(ns, node, upgrade) {
	// purchase least expensive upgrade type
	switch (upgrade) {
		case "ram":
			ns.hacknet.upgradeRam(node, 1);
			break;
		case "core":
			ns.hacknet.upgradeCore(node, 1);
			break;
		default:
			ns.hacknet.upgradeLevel(node, 1);
			break;
	}
}

/** @param {NS} ns **/
export async function main(ns) {
	const TICK = 3000;
	let node = ns.args[0];

	ns.disableLog("sleep");
	ns.disableLog("getServerMoneyAvailable")

	if (!ns.hacknet.getNodeStats(node)) {
		ns.print("Node designated " + node + " does not exist");
		return;
	}

	ns.tprint("Upgrading hacknet-node-" + node);
	while (upgradesAvailable(ns, node)) {
		let upgrade = leastCostlyUpgrade(ns, node);
		// stall for cash
		while (!isAffordable(ns, node, upgrade)) {
			await ns.sleep(TICK);
		}
		buyUpgrade(ns, node, upgrade);
	}
	ns.tprint("hacknet-node-" + node + " fully upgraded");
}