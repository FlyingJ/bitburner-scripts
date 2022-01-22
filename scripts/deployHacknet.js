const TICK = 3000;
const MAXWAIT = 3600 * 12; // 12 hours in seconds
const BASEMAXEARNINGS = 9171;

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('sleep');

	const maxEarnings = BASEMAXEARNINGS * hacknetMultProd(ns);
	let cost = ns.hacknet.getPurchaseNodeCost();
	while (canRecoup(ns, cost, maxEarnings)) {
		while (!affordable(ns, cost)) { await ns.sleep(TICK); }
		buyNode(ns);
		cost = ns.hacknet.getPurchaseNodeCost();
	}

	ns.tprint('Additional hacknet nodes cannot break even');
}

function canRecoup(ns, cost, maxEarnings) { return breakEvenTime(cost, maxEarnings) < MAXWAIT ? true : false; }
function hacknetMultProd(ns) { return ns.getHacknetMultipliers().production; }
function breakEvenTime(cost, earnings) { return cost / earnings; }
function affordable(ns, cost) { return cost < moneyAvailable(ns) ? true : false; }
function moneyAvailable(ns) { return ns.getServerMoneyAvailable('home'); }
function buyNode(ns) { ns.tprint('Purchased hacknet-node-' + ns.hacknet.purchaseNode()); }

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


/** @param {NS} ns **/
export async function main(ns) {
	await upgradeNode(ns, ns.args[0]);
}

async function upgradeNode(ns, node) {
	ns.disableLog('sleep');
	ns.disableLog('getServerMoneyAvailable')

	if (!exists(ns, node)) {
		ns.tprint('hacknet-node-' + node + ' does not exist');
		return;
	}

	ns.tprint('Upgrading hacknet-node-' + node);
	while (upgradesAvailable(ns, node)) {
		let upgrade, cost = leastCostlyUpgrade(ns, node);
		while (!affordable(ns, cost)) { await ns.sleep(TICK); }
		buyUpgrade(ns, node, upgrade);
	}
	ns.tprint('hacknet-node-' + node + ' fully upgraded');
}

function exists(ns, node) { return ns.hacknet.getNodeStats(node) ? true : false; }

function upgradesAvailable(ns, node) {
	return (levelAvailable(ns, node) || ramAvailable(ns, node) || coreAvailable(ns, node)) ? true : false;
}

function levelAvailable(ns, node) { return isFinite(ns.hacknet.getLevelUpgradeCost(node, 1)) ? true : false; }
function ramAvailable(ns, node) { return isFinite(ns.hacknet.getRamUpgradeCost(node, 1)) ? true : false; }
function coreAvailable(ns, node) { return isFinite(ns.hacknet.getCoreUpgradeCost(node, 1)) ? true : false; }

function leastCostlyUpgrade(ns, node) {
	let minCost = 0;
	
	cost(ns, node, upgrade);
	let minCost = ns.hacknet.getLevelUpgradeCost(node, 1);
	let upgrade = "level";

	let ramCost = ns.hacknet.getRamUpgradeCost(node, 1);
	if (ramCost < minCost) {
		minCost = ramCost;
		upgrade = "ram";
	}

	var coreCost = ns.hacknet.getCoreUpgradeCost(node, 1);
	if (coreCost < minCost) {
		minCost = coreCost;
		upgrade = "core";
	}

	return isFinite(minCost) ? upgrade, minCost : null, null;
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

function buyUpgrade(ns, node, upgrade) {
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
