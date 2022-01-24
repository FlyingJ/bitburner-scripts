const TICK = 1000;
const PARTS = ['Level', 'Ram', 'Core'];

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('sleep');
	ns.disableLog('getServerMoneyAvailable');

	await deployUpgrades(ns);

	ns.print('Finished deploying upgrades');
}

/*
The following block of functions need work.
The least costly upgrade option is found twice on most occasions.
Consequently, all available options are collected twice on most occasions.
Potential spinning when earning money for a node while no other upgrades available.

Hard-coded script path for node deployer.
*/
async function deployUpgrades(ns) {
	while (upgradesAvailable(ns) || nodesDeploying(ns)) { await buyUpgrade(ns); }
}
function upgradesAvailable(ns) { return isFinite(leastCostlyOption(getAllOptions(ns)).cost); }
function nodesDeploying(ns) { return ns.isRunning(`/scripts/deployNodes.js`); }
async function buyUpgrade(ns) { await purchase(ns, leastCostlyOption(getAllOptions(ns))); }

function leastCostlyOption(options) { return options.sort((a, b) => a.cost - b.cost)[0]; }

function getAllOptions(ns) {
	let options = [];
	for (let nodeIndex = 0; nodeIndex < ns.hacknet.numNodes(); nodeIndex += 1) {
		options = options.concat(getPerNodeOptions(ns, nodeIndex));
	}
	return options;
}
function getPerNodeOptions(ns, nodeIndex) {
	let options = [];
	for (let part of PARTS) {
		let option = {
			'nodeIndex': nodeIndex,
			'part': part,
			'cost': cost(ns, nodeIndex, part)
		};
		options.push(option);
	}
	return options;
}
function cost(ns, nodeIndex, part) {
	let costFunction = `get${part}UpgradeCost`;
	return ns.hacknet[costFunction](nodeIndex, 1);
}

async function purchase(ns, option) {
	let buyFunction = `upgrade${option.part}`;
	while (option.cost > availableMoney(ns)) { await ns.sleep(TICK); }
	ns.print(`Purchasing ${option.part} for hacknet-node-${option.nodeIndex} at cost of $${option.cost}`);
	return ns.hacknet[buyFunction](option.nodeIndex, 1);
}

function availableMoney(ns) { return ns.getServerMoneyAvailable('home'); }