/** @param {NS} ns */
export async function main(ns) {
	ns.corporation.createCorporation(`CO`, true);
	ns.corporation.expandIndustry(`Agriculture`, `AG`);
	ns.corporation.unlockUpgrade(`Smart Supply`);
	ns.corporation.setSmartSupply(`AG`, `Sector-12`, true);
}

/*
const city = `New Tokyo`;
const industry = `Agriculture`;
const headCount = 33;
const employeeDistribution = {
	'Operations': 20,
	'Engineer': 5,
	'Business': 2,
	'Management': 1,
	'Research & Development': 5,
};
const warehouseSize = 56 * 1000;
const realEstateBuyVolume = 10 * 1000 * 1000;

/** @param {NS} ns **/
/*
export async function main(ns) {
	let myCorporation = ns.corporation.getCorporation();
	myCorporation.divisions.forEach((division) => {
		ns.tprint(division);
	});
	myCorporation.divisions
}

{
	"name":"CORP",
	"funds":3.650707433269212e+23,
	"revenue":158621829.12606987,
	"expenses":31154768.700548045,
	"public":true,
	"totalShares":2060000000,
	"numShares":1801000000,
	"shareSaleCooldown":0,
	"issuedShares":0,
	"sharePrice":388767748203639.75,
	"state":"START",
	"divisions":[
		{
			"name":"AG",
			"type":"Agriculture",
			"awareness":4563.843688677289,
			"popularity":1202.0806227144649,
			"prodMult":364.47082879886864,
			"research":9308.752559242022,
			"lastCycleRevenue":158621829.12606987,
			"lastCycleExpenses":31154768.700548045,
			"thisCycleRevenue":1585852176.325491,
			"thisCycleExpenses":311337116.3569713,
			"upgrades":[0,16],
			"cities":["Aevum","Sector-12"],
			"products":[]
		}
	]
}
*/