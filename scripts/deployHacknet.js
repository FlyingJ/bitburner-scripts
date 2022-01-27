const TICK = 1250;
const MAXWAIT = 3600 * 12; // 12 hours in seconds
const BASEMAXNODEEARNINGS = 9171;
const PARTS = ['Level', 'Ram', 'Core'];

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('sleep');

	await deployHacknet(ns);

	ns.print('Finished deploying hacknet');
}


async function deployHacknet(ns) {
	let options = getAllOptions(ns);
	let option = leastCostlyOption(options);
	do {
		await purchase(ns, option);
		options = getAllOptions(ns);
		option = leastCostlyOption(options);
	} while (purchasesAvailable(option));
}

function getAllOptions(ns) {
	let options = [];
	// get upgrades
	for (let nodeIndex = 0; nodeIndex < ns.hacknet.numNodes(); nodeIndex += 1) {
		options = options.concat(getPerNodeOptions(ns, nodeIndex));
	}
	// get next node
	options = options.concat(
		{
			'nodeIndex': undefined,
			'part': 'Node',
			'cost': cost(ns, undefined, 'Node')
		});
	return options;
}
function getPerNodeOptions(ns, nodeIndex) {
	ns.print(`Getting options from hacknet-node-${nodeIndex}`);
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
	if (part === 'Node') {
		return getNodeCost(ns);
	}
	let costFunction = `get${part}UpgradeCost`;
	return ns.hacknet[costFunction](nodeIndex, 1);
}
function getNodeCost(ns) {
	// make sure not to buy more nodes when unable to recoup the expense
	// in a reasonable amount of time
	let cost = ns.hacknet.getPurchaseNodeCost();
	const maxEarnings = BASEMAXNODEEARNINGS * hacknetMultProd(ns);
	if (canRecoup(ns, cost, maxEarnings)) { return cost; }
	return Infinity;
}
function hacknetMultProd(ns) { return ns.getHacknetMultipliers().production; }
function canRecoup(ns, cost, maxEarnings) { return breakEvenTime(cost, maxEarnings) < MAXWAIT ? true : false; }
function breakEvenTime(cost, earnings) { return cost / earnings; }

function leastCostlyOption(options) { return options.sort((a, b) => a.cost - b.cost)[0]; }
function purchasesAvailable(option) { return isFinite(option.cost); }

async function purchase(ns, option) {
	let index = option.nodeIndex;
	let part = option.part;
	let cost = option.cost;

	while (cost > myMoney(ns)) { await ns.sleep(TICK); }

	if (part === 'Node') {
		ns.print(`Purchase hacknet-node-${ns.hacknet.purchaseNode()}`);
		return true;
	}

	let upgradeFunction = `upgrade${part}`;
	ns.print(`Purchase ${part} for hacknet-node-${index} at cost of $${cost}`);
	return ns.hacknet[upgradeFunction](index, 1);
}

function myMoney(ns) { return ns.getServerMoneyAvailable('home'); }