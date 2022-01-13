export function upgradesAvailable(ns, node) {
	if (isFinite(ns.hacknet.getLevelUpgradeCost(node, 1)) ||
		isFinite(ns.hacknet.getRamUpgradeCost(node, 1)) ||
		isFinite(ns.hacknet.getCoreUpgradeCost(node, 1))) {
		return true;
	}
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

export function isAffordable(ns, node, upgradeType) {
	var cost;
	switch (upgradeType) {
		case "ram":
			cost = ns.hacknet.getRamUpgradeCost(node, 1);
			break;
		case "core":
			cost = ns.hacknet.getCoreUpgradeCost(node, 1);
			break;
		default:
			cost = ns.hacknet.getLevelUpgradeCost(node, 1);
			break;
	}
	if (cost > ns.getServerMoneyAvailable("home")) {
		return false;
	} else {
		return true;
	}
}

export function buyUpgrade(ns, node, upgradeType) {
	// purchase least expensive upgrade type
	switch (upgradeType) {
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

export function showStat(ns, node, upgradeType) {
	// purchase least expensive upgrade type
	switch (upgradeType) {
		case "ram":
			return (ns.hacknet.getNodeStats(node)).ram;
		case "core":
			return (ns.hacknet.getNodeStats(node)).cores;
		default:
			return (ns.hacknet.getNodeStats(node)).level;
	}
}

/** @param {NS} ns **/
export async function main(ns) {
	const TICK = 1000;
	let node = ns.args[0];

	ns.disableLog("sleep");

	if (!ns.hacknet.getNodeStats(node)) {
		ns.print("Node designated " + node + " does not exist");
	} else {
		ns.tprint("Upgrading node designated hacknet-node-" + node);
		while (upgradesAvailable(ns, node)) {
			let upgradeType = leastCostlyUpgrade(ns, node);
			// stall for cash
			while (!isAffordable(ns, node, upgradeType)) {
				await ns.sleep(TICK);
			}
			ns.print("Purchasing " + upgradeType + " for node " + node);
			buyUpgrade(ns, node, upgradeType);
			ns.print("New value of " + upgradeType + " on Node " + node + ": " + showStat(ns, node, upgradeType));
		}
		ns.tprint("Node " + node + " is fully upgraded");
	}
}