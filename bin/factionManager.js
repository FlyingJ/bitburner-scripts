const FACTIONS = [
	"Illuminati",
	"Daedalus",
	"The Covenant",
	"ECorp",
	"MegaCorp",
	"Bachman & Associates",
	"Blade Industries",
	"NWO",
	"Clarke Incorporated",
	"OmniTek Incorporated",
	"Four Sigma",
	"KuaiGong International",
	"Fulcrum Secret Technologies",
	"BitRunners",
	"The Black Hand",
	"NiteSec",
	"Aevum",
	"Chongqing",
	"Ishima",
	"New Tokyo",
	"Sector-12",
	"Volhaven",
	"Speakers for the Dead",
	"The Dark Army",
	"The Syndicate",
	"Silhouette",
	"Tetrads",
	"Slum Snakes",
	"Netburners",
	"Tian Di Hui",
	"CyberSec",
	"Bladeburners",
	"Church of the Machine God",
];
const WORK = `Hacking Contracts`;
const TICK = 60 * 1000;

/** @param {NS} ns **/
export async function main(ns) {

	while(NNNN) {
		joinFactions(ns);
		let
	}
	for (let faction of FACTIONS) {
		let maxRep = getAugmentationData(ns, faction).sort((a, b) => b.rep - a.rep)[0].rep;
		while (ns.getFactionRep(faction) < maxRep) {
			ns.workForFaction(faction, WORK, false);
			await ns.sleep(TICK);
		}
		ns.stopAction();
		ns.tprint(`Sufficient Rep: ${faction}`);
	}
}

const function joinFactions(ns) {
	let factions = ns.checkFactionInvitations();
	factions.forEach(faction => ns.joinFaction(faction));
	return factions;
}

const function getAugmentationData(ns, faction) {
	let augmentationData = [];
	for (let augmentation of ns.getAugmentationsFromFaction(faction)) {
		augmentationData.push({
			'name': augmentation,
			'price': ns.getAugmentationPrice(augmentation),
			'rep': ns.getAugmentationRepReq(augmentation),
		});
	}
	return augmentationData;
}

const function getFactionData(ns, faction) {

}

const function getAllFactions() { return FACTIONS; }