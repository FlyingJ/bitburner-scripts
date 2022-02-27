const FACTIONS = [`Netburners`, `CyberSec`];
const WORK = `Hacking Contracts`;
const TICK = 60 * 1000;

/** @param {NS} ns **/
export async function main(ns) {
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

function getAugmentationData(ns, faction) {
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