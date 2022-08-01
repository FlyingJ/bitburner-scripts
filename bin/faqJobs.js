const CORPS = [
	"ECorp",
	"MegaCorp",
	"Bachman & Associates",
	"Blade Industries",
	"NWO",
	"Clarke Incorporated",
	"OmniTek Incorporated",
	"Four Sigma",
	"KuaiGong International",
//	"Fulcrum Secret Technologies",
];

/** @param {NS} ns */
export async function main(ns) {
	function inFaction(faction) { return ns.getPlayer().factions.includes(faction); }
	function hazJob(corp) { return Object.keys(ns.getPlayer().jobs).includes(corp); }

	ns.tail();
	ns.disableLog('sleep');

	for (let corp of CORPS) {
		// already belong to corp faction?
		if (!inFaction(corp)) {
			// no? do we haz job at corp?
			while (!hazJob(corp)) {
				ns.singularity.applyToCompany(corp, 'Software');
				await ns.sleep(200);
			}
			// brute forced our way into the big leagues
			// now work, bitch
			while (ns.singularity.getCompanyRep(corp) < 250 * 1000) {
				ns.singularity.workForCompany(corp, false);
				await ns.sleep(15 * 1000);
			}

			ns.print(`Finished earning rep at ${corp} corporation.`);
		} else {
			ns.print(`Already belong to ${corp} faction.`);
		}
	}
}