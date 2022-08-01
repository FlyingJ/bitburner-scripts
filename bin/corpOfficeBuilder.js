/** @param {NS} ns */
export async function main(ns) {
	const TICK = 0.2 * 1000;

	const division = "AG";
	const city = "Sector-12";

	// warehouse initialization
	while (!ns.corporation.hasWarehouse(division, city)) {
		await ns.sleep(TICK);
		ns.corporation.purchaseWarehouse(division, city);
	}

	if (!ns.corporation.getWarehouse(division, city)["smartSupplyEnabled"]) { ns.corporation.setSmartSupply(division, city, true); }

	ns.corporation.setSmartSupplyUseLeftovers(division, city, 'Water', true);
	ns.corporation.setSmartSupplyUseLeftovers(division, city, 'Energy', true);

	ns.corporation.sellMaterial(division, city, 'Plants', 'MAX', 'MP');
	ns.corporation.sellMaterial(division, city, 'Food', 'MAX', 'MP');

	// office initialization
	const maxEmployees = 100;
	// set office size
	while (ns.corporation.getOffice(division, city).size < maxEmployees) {
		await ns.sleep(TICK);
		ns.corporation.upgradeOfficeSize(division, city, 1);
	}
	// get employees
	while (ns.corporation.getOffice(division, city).employees.length < maxEmployees) {
		await ns.sleep(TICK);
		ns.corporation.hireEmployee(division, city);
	}

	await ns.corporation.setAutoJobAssignment(division, city, `Operations`, 70);
	await ns.corporation.setAutoJobAssignment(division, city, `Engineer`, 15);
	await ns.corporation.setAutoJobAssignment(division, city, `Business`, 5);
	await ns.corporation.setAutoJobAssignment(division, city, `Management`, 5);
	await ns.corporation.setAutoJobAssignment(division, city, `Research & Development`, 5);
}

/*
AllMaterials: [
	"Water",
	"Energy",
	"Food",
	"Plants",
	"Metal",
	"Hardware",
	"Chemicals",
	"Drugs",
	"Robots",
	"AI Cores",
	"Real Estate",
  ],
  */