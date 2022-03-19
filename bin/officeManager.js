const city = `Aevum`;
const industry = `Agriculture`;
const headCount = 33;
const employeeDistribution = {
	'Operations': 20,
	'Engineer': 5,
	'Business': 2,
	'Management': 1,
	'Research & Development': 5,
};
const upgradeCostLimit = 250e12;
const resource = `Real Estate`;
const TICK = 3 * 1000;

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('sleep');

	let division = ns.corporation.getCorporation().divisions[0];

	if (!division.cities.includes(city)) {
		ns.print(`Prepping to buy office space in ${city}.`);
		while (ns.corporation.getCorporation().funds < ns.corporation.getExpandCityCost()) { await ns.sleep(TICK); }
		ns.corporation.expandCity(division.name, city);
	}
	ns.print(`Have office space in ${city}.`);

	if (!ns.corporation.hasWarehouse(division.name, city)) {
		ns.print(`Prepping to buy warehouse in ${city}.`);
		while (ns.corporation.getCorporation().funds < ns.corporation.getPurchaseWarehouseCost()) { await ns.sleep(TICK); }
		ns.corporation.purchaseWarehouse(division.name, city);
	}
	ns.print(`Have warehouse in ${city}.`);

	while (ns.corporation.getUpgradeWarehouseCost(division.name, city) < upgradeCostLimit) {
		while (ns.corporation.getCorporation().funds < ns.corporation.getUpgradeWarehouseCost(division.name, city)) { await ns.sleep(TICK); }
		ns.corporation.upgradeWarehouse(division.name, city);
		ns.print(`${city} warehouse size: ${ns.corporation.getWarehouse(division.name, city).size}`);
	}

	let units = 0.8 * ns.corporation.getWarehouse(division.name, city).size * 200;
	if (ns.corporation.hasResearched(division.name, `Bulk Purchase`)) {
		ns.print(`Buying ${units} units of ${resource} the quick and easy way.`);
		ns.corporation.bulkPurchase(division.name, city, `Real Estate`, units);
	} else {
		ns.print(`Buying ${units} units of ${resource} in the clunky way.`);
		let rate = units / 100; // purchase over 10 market cycles, or around 100 seconds
		ns.corporation.buyMaterial(division.name, city, resource, rate);
		while (ns.corporation.getMaterial(division.name, city, resource).qty < units) { await ns.sleep(TICK); }
		ns.corporation.buyMaterial(division.name, city, resource, 0);
	}

	ns.tprint(ns.corporation.getOffice(division.name, city));
}
/*  CorporationInfo
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

/*  WarehouseInfo
{
	"level":1,
	"loc":"New Tokyo",
	"size":100,
	"sizeUsed":0,
	"smartSupplyEnabled":true
}
*/

/*  OfficeInfo
{
	"loc":"Aevum",
	"size":3,
	"minEne":0,
	"maxEne":100,
	"minHap":0,
	"maxHap":100,
	"maxMor":100,
	"employees":[],
	"employeeProd":{
		"Operations":0,
		"Engineer":0,
		"Business":0,
		"Management":0,
		"Research & Development":0
	}
}
*/