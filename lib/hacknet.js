class Node {
	constructor(id) {
		this.id = id;
		this.core = {
			buy(n=1) { return ns.hacknet.upgradeCore(this.id, n); }
			cost(n=1) { return ns.hacknet.getCoreUpgradeCost(this.id, n); }
		};
		this.level = {
			buy(n=1) { return ns.hacknet.upgradeLevel(this.id, n); }
			cost(n=1) { return ns.hacknet.getLevelUpgradeCost(this.id, n); }
		}
		this.ram = {
			buy(n=1) { return ns.hacknet.upgradeRam(this.id, n); }
			cost(n=1) { return ns.hacknet.getRamUpgradeCost(this.id, n); }
		}
	}
	stats() { return ns.hacknet.getNodeStats(this.id); }
}

class Hacknet {
	constructor() {
		this.nodes = [];
		this.servers = [];
	}
	buyNode() { this.nodes.push(new Node(ns.hacknet.purchaseNode())); }
	buyNodes() { }
	buyServer() { }
	buyServers() { ns.print(`Hacknet server functionality coming soon!`); }
	nodeCost() { return ns.hacknet.getPurchaseNodeCost(); }
}

/*
getCacheUpgradeCost(index, n)	Calculate the cost of upgrading hacknet node cache.
upgradeCache(index, n)	        Upgrade the cache of a hacknet node.

getCoreUpgradeCost(index, n)	Calculate the cost of upgrading hacknet node cores.
upgradeCore(index, n)	        Upgrade the core of a hacknet node.

getLevelUpgradeCost(index, n)	Calculate the cost of upgrading hacknet node levels.
upgradeLevel(index, n)	        Upgrade the level of a hacknet node.

getRamUpgradeCost(index, n)	    Calculate the cost of upgrading hacknet node RAM.
upgradeRam(index, n)	        Upgrade the RAM of a hacknet node.


getHashUpgradeLevel(upgName)	Get the level of a hash upgrade.
hashCapacity()	                Get the maximum number of hashes you can store.
hashCost(upgName)	            Get the cost of a hash upgrade.
getHashUpgrades()	            Get the list of hash upgrades
numHashes()	                    Get the total number of hashes stored.
spendHashes(upgName, upgTarget)	Purchase a hash upgrade.

getStudyMult()	                Get the multiplier to study.
getTrainingMult()	            Get the multiplier to training.

maxNumNodes()	                Get the maximum number of hacknet nodes.
numNodes()	                    Get the number of hacknet nodes you own.
purchaseNode()	                Purchase a new hacknet node.

Property        Type    Description
cache           number  Cache level. Only applicable for Hacknet Servers
cores           number  Node's number of cores
hashCapacity    number  Hash Capacity provided by this Node. Only applicable for Hacknet Servers
level           number  Node's level
name            string  Node's name
production      number  Node's production per second
ram             number  Node's RAM (GB)
ramUsed         number  Node's used RAM (GB)
timeOnline      number  Number of seconds since Node has been purchased
totalProduction number  Total number of money Node has produced

*/