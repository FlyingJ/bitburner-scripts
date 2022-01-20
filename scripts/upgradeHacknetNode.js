const TICK = 10000;

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	let node = ns.args[0];
	if (!ns.hacknet.getNodeStats(node)) {
		ns.print('hacknet-node-' + node + ' does not exist');
		return;
	}

	ns.tprint('Upgrading hacknet-node-' + node);
	while (upgradesAvailable(ns, node)) { buyLeastExpensiveUpgrade(ns, node); }

	ns.tprint('hacknet-node-' + node + ' fully upgraded');
}

function upgradesAvailable(ns, node) {
	if (levelAvailable(ns, node) || ramAvailable(ns, node) || coreAvailable(ns, node)) return true;
	return false;
}

function levelAvailable(ns, node) {
	if (isFinite(ns.hacknet.getLevelUpgradeCost(node, 1))) return true;
	return false;
}

function ramAvailable(ns, node) {
	if (isFinite(ns.hacknet.getRamUpgradeCost(node, 1))) return true;
	return false;
}

function coreAvailable(ns, node) {
	if (isFinite(ns.hacknet.getCoreUpgradeCost(node, 1))) return true;
	return false;
}


function buyLeastExpensiveUpgrade(ns, node) {
	let upgrade = leastExpensiveUpgrade(ns, node);
	// stall for cash
	while (!affordable(ns, node, upgrade)) { await ns.sleep(TICK); }

	buyUpgrade(ns, node, upgrade);
	ns.print("New value of " + upgrade + " on Node " + node + ": " + showStat(ns, node, upgrade));
}


export function leastExpensiveUpgrade(ns, node) {
	let minCost = ns.hacknet.getLevelUpgradeCost(node, 1);
	let upgrade = "level";

	let ramCost = ns.hacknet.getRamUpgradeCost(node, 1);
	if (ramCost < minCost) {
		minCost = ramCost;
		upgrade = "ram";
	}

	let coreCost = ns.hacknet.getCoreUpgradeCost(node, 1);
	if (coreCost < minCost) {
		minCost = coreCost;
		upgrade = "core";
	}

	if (isFinite(minCost)) return upgrade;
	return null;
}

export function affordable(ns, node, upgrade) {
	let cost = getCost(ns, node, upgrade);

	if (canAfford(ns, cost)) return true;
	return false;
}

function getCost(ns, node, upgrade) {
	switch (upgrade) {
		case "ram": return ns.hacknet.getRamUpgradeCost(node, 1);
		case "core": return ns.hacknet.getCoreUpgradeCost(node, 1);
		default: return ns.hacknet.getLevelUpgradeCost(node, 1);     // level is remaining type
	}
}

function canAfford(ns, cost) {
	if (ns.getServerMoneyAvailable('home') > cost) return true;
	return false;
}

export function buyUpgrade(ns, node, upgrade) {
	ns.print('Purchasing ' + upgrade + ' for hacknet-node-' + node);
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

export function showStat(ns, node, hardware) {
	switch (hardware) {
		case "ram": return (ns.hacknet.getNodeStats(node)).ram;
		case "core": return (ns.hacknet.getNodeStats(node)).cores;
		default: return (ns.hacknet.getNodeStats(node)).level;
	}
}