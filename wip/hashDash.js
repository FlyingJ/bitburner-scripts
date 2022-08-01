/** @param {NS} ns */
export async function main(ns) {

	class Upgrade {

		constructor(name) {
			this.name = name;
		}

		buy() { return ns.hacknet.spendHashes(this.name); }
		cost() { return ns.hacknet.hashCost(this.name); }
		level() { return ns.hacknet.getHashUpgradeLevel(this.name); }

		print() { ns.tprintf("%36c | %3d | %20d", this.name, this.level(), this.cost()); }
	}


	class HashMart {

		constructor() {
			this.upgrades = [];
			ns.hacknet.getHashUpgrades().forEach((upgradeName) => { this.upgrades.push(new Upgrade(upgradeName)); });
		}

		stats() {
			ns.tprint("=" * 65);
			ns.tprintf("%36c | %3d | %20d", `Name`, `Level`, `Cost`);
			ns.tprint("=" * 65);
			this.upgrades.forEach((upgrade) => { upgrade.print(); })
		}
	}


	let hashMart = new HashMart();
	hashMart.stats();

}
/*
export async function main(ns) {
	let TICK = 200; // sleep millis

	let updates = {
		growth: [
			"Improve Studying",
			"Improve Gym Training",
			"Exchange for Bladeburner Rank",
			"Exchange for Bladeburner SP",
		],
		static: [
			"Sell for Money",
			"Sell for Corporation Funds"
		],
		targeted: [
			"Reduce Minimum Security",
			"Increase Maximum Money",
		],
		meh: [
			"Exchange for Corporation Research",
			"Generate Coding Contract",
		],
	}

	// let upgrades = ns.hacknet.getHashUpgrades();
	// ns.tprint(upgrades);
	do {
		ns.hacknet.spendHashes(`Exchange for Bladeburner Rank`);
		ns.hacknet.spendHashes(`Exchange for Bladeburner SP`);
		await ns.sleep(TICK);
	} while (ns.getPlayer().money < 1e150);
}
*/