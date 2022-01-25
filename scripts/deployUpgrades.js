import {getHacknetUpgradeScript} from 'import.js';

const TICK = 1250;
const PARTS = ['Level', 'Ram', 'Core'];

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('sleep');
	ns.disableLog('getServerMoneyAvailable');

	await deployUpgrades(ns);

	ns.print('Finished deploying upgrades');
}

async function deployUpgrades(ns) {
		let options = getAllOptions(ns);
		let option = leastCostlyOption(options);
	do {
		await purchase(ns, option);
		options = getAllOptions(ns);
		option = leastCostlyOption(options);
	} while (necessary(ns, option));
}
function necessary(ns, option) {
	return (nodesDeploying(ns) || upgradesAvailable(option));
}
function nodesDeploying(ns) { return ns.isRunning(`${getHacknetUpgradeScript()}`); }
function upgradesAvailable(option) { return isFinite(option.cost); }
function leastCostlyOption(options) { return options.sort((a, b) => a.cost - b.cost)[0]; }

function getAllOptions(ns) {
	let options = [];
	for (let nodeIndex = 0; nodeIndex < ns.hacknet.numNodes(); nodeIndex += 1) {
		options = options.concat(getPerNodeOptions(ns, nodeIndex));
	}
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
	let costFunction = `get${part}UpgradeCost`;
	return ns.hacknet[costFunction](nodeIndex, 1);
}

async function purchase(ns, option) {
	let index = option.nodeIndex;
	let part = option.part;
	let cost = option.cost;
	let buyFunction = `upgrade${part}`;
	while (cost > myMoney(ns)) { await ns.sleep(TICK); }
	ns.print(`Purchasing ${part} for hacknet-node-${index} at cost of $${cost}`);
	return ns.hacknet[buyFunction](index, 1);
}

function myMoney(ns) { return ns.getServerMoneyAvailable('home'); }