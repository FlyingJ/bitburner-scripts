const TICK = 1000;

/** @param {NS} ns **/
export async function main(ns) {
	await deployUpgrades(ns);
}

async function deployUpgrades(ns) {
	while (upgradesAvailable(ns) || nodesDeploying(ns)) {
		await buyUpgrade(ns);
		await ns.sleep(TICK);
	}
}

function upgradesAvailable(ns) { return isFinite(leastCostlyUpgradeOrder(ns).cost); }

function getUpgradeOrders(ns) {
	let upgradeSchedule = [];
	for (let nodeIndex = 0; nodeIndex < ns.hacknet.numNodes(); nodeIndex += 1) {
		upgradeSchedule.push(getCheapestUpgrade(ns, nodeIndex));
	}
	return upgradeSchedule;
}

function getCheapestUpgrade(ns, nodeIndex) {
	return getUpgrades(ns, nodeIndex).sort((a, b) => a.cost - b.cost)[0];
}

function getUpgrades(ns, nodeIndex) {
	let upgrades = [];
	['level', 'ram', 'core'].forEach(part => upgrades.push({ 'nodeIndex': nodeIndex, 'part': part, 'cost': cost(ns, nodeIndex, part) }));
	return upgrades;
}

function cost(ns, nodeIndex, part) {
	let Part = part.charAt(0).toUpperCase() + part.slice(1);
	let costFunction = `get${Part}UpgradeCost`;
	return ns.hacknet[costFunction](nodeIndex, 1);
}

function nodesDeploying(ns) { return ns.isRunning(`/scripts/autoHacknet.js`); }

async function buyUpgrade(ns) { await purchase(ns, leastCostlyUpgradeOrder(ns)); }

function leastCostlyUpgradeOrder(ns) { return getUpgradeOrders(ns).sort((a, b) => a.cost - b.cost)[0]; }

async function purchase(ns, upgradeOrder) {
	while (upgradeOrder.cost > availableFunds(ns)) { await ns.sleep(TICK); }
	let Part = upgradeOrder.part.charAt(0).toUpperCase() + upgradeOrder.part.slice(1);
	let buyFunction = `upgrade${Part}`;
	return ns.hacknet[buyFunction](upgradeOrder.nodeIndex, 1);
}

function availableFunds (ns) { return ns.getServerMoneyAvailable('home'); }