export function upgradesAvailable(ns, node) {
	return (levelAvailable(ns, node) || ramAvailable(ns, node) || coreAvailable(ns, node)) ? true : false;
}

function levelAvailable(ns, node) { return isFinite(ns.hacknet.getLevelUpgradeCost(node, 1)) ? true : false; }
function ramAvailable(ns, node) { return isFinite(ns.hacknet.getRamUpgradeCost(node, 1)) ? true : false; }
function coreAvailable(ns, node) { return isFinite(ns.hacknet.getCoreUpgradeCost(node, 1)) ? true : false; }

export function leastCostlyUpgrade(ns, node) {
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

	return isFinite(minCost) ? upgrade : null;
}

export function isAffordable(ns, node, upgrade) { return cost(ns, node, upgrade) < availableFunds(ns) ? true : false; }

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

function availableFunds(ns) {
	return ns.getServerMoneyAvailable('home');
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