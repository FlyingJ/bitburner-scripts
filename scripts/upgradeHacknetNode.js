const TICK = 1000;

/** @param {NS} ns **/
export async function main(ns) {
	await upgradeNode(ns, ns.args[0]);
}

async function upgradeNode(ns, node) {
	ns.disableLog('sleep');
	ns.disableLog('getServerMoneyAvailable');

	if (!exists(ns, node)) {
		ns.tprint(`hacknet-node-${node} does not exist`);
		return;
	}

	ns.tprint(`Upgrading hacknet-node-${node}`);
	while (upgradesAvailable(ns, node)) {
		let [upgrade, cost] = leastCostlyUpgrade(ns, node);
		ns.print(`Least costly upgrade for hacknet-node-${node} is ${upgrade} at $${cost}`);
		while (!affordable(ns, cost)) { await ns.sleep(TICK); }
		buyUpgrade(ns, node, upgrade);
	}
	ns.tprint(`hacknet-node-${node} fully upgraded`);
}

function exists(ns, node) { return ns.hacknet.getNodeStats(node) ? true : false; }

function upgradesAvailable(ns, node) { return (levelAvailable(ns, node) || ramAvailable(ns, node) || coreAvailable(ns, node)) ? true : false; }

function levelAvailable(ns, node) { return isFinite(cost(ns, node, 'level')) ? true : false; }
function ramAvailable(ns, node) { return isFinite(cost(ns, node, 'ram')) ? true : false; }
function coreAvailable(ns, node) { return isFinite(cost(ns, node, 'core')) ? true : false; }

function leastCostlyUpgrade(ns, node) {
	let minCost = cost(ns, node, 'level');
	let upgrade = 'level';

	let ramCost = cost(ns, node, 'ram');
	if (ramCost < minCost) {
		minCost = ramCost;
		upgrade = 'ram';
	}

	var coreCost = cost(ns, node, 'core');
	if (coreCost < minCost) {
		minCost = coreCost;
		upgrade = 'core';
	}

	return isFinite(minCost) ? [upgrade, minCost] : [null, null];
}

function cost(ns, node, upgrade) {
	let part = upgrade.charAt(0).toUpperCase() + upgrade.slice(1);
	let costFunction = `get${part}UpgradeCost`;
	return ns.hacknet[costFunction](node, 1);
}

function affordable(ns, cost) { return cost < moneyAvailable(ns) ? true : false; }
function moneyAvailable(ns) { return ns.getServerMoneyAvailable('home'); }

function buyUpgrade(ns, node, upgrade) {
	let part = upgrade.charAt(0).toUpperCase() + upgrade.slice(1);
	let upgradeFunction = `upgrade${part}`;
	return ns.hacknet[upgradeFunction](node, 1);
}