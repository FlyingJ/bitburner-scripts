export function isEconomical(ns) {
	const MAXWAIT = 43200; // 12 hours in seconds
	const maxNodeProduction = 9171 * ns.getHacknetMultipliers().production; // HN node earns 9171 $/s maxed out

	if (ns.hacknet.getPurchaseNodeCost() / maxNodeProduction < MAXWAIT) {
		return true;
	} else {
		return false;
	}
}

export function isAffordable(ns) {
	let cost = ns.hacknet.getPurchaseNodeCost();
	if (cost < ns.getServerMoneyAvailable("home")) {
		return true;
	} else {
		return false;
	}
}

/** @param {NS} ns **/
export async function main(ns) {

	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	const TICK = 1000;
	while (isEconomical(ns)) {
		while (!isAffordable(ns)) {
			await ns.sleep(TICK);
		}
		let node = ns.hacknet.purchaseNode();
		ns.tprint("Purchased node designated hacknet-node-" + node);
		ns.run("/scripts/upgradeHacknetNode.js", 1, node);
	}
	ns.tprint("Not economical to purchase additional hacknet nodes");
}