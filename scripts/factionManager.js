const FACTIONS = [`NiteSec`, `Aevum`];
const WORK = `Hacking Contracts`;
const TICK = 60 * 1000;

/** @param {NS} ns **/
export async function main(ns) {
	for (let faction of FACTIONS) {
		let augmentationData = [];
		let augmentations = ns.getAugmentationsFromFaction(faction);
		for (let augmentation of augmentations) {
			augmentationData.push({
				'name': augmentation,
				'price': ns.getAugmentationPrice(augmentation),
				'rep': ns.getAugmentationRepReq(augmentation),
			});
		}
		let maxRep = augmentationData.sort((a, b) => b.rep - a.rep)[0].rep;
		ns.tprint(maxRep);
		while (ns.getFactionRep(faction) < maxRep) {
			ns.workForFaction(faction, WORK, false);
			await ns.sleep(TICK);
		}
		ns.stopAction();
		ns.tprint(`Sufficient Rep: ${faction}`);
	};
};