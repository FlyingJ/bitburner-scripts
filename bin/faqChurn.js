const WORKS = [`Hacking Contracts`, `Field Work`, `Security Work`];
const WORK = `Security Work`;
const statSets = {
	'field': ['hacking', 'strength', 'defense', 'dexterity', 'agility', 'charisma'],
	'hacking': ['hacking'],
	'security': ['hacking', 'strength', 'defense', 'dexterity', 'agility'],
}

/** @param {NS} ns */
export async function main(ns) {
	function getJoinedFactions() {
		return ns.getPlayer().factions;
	}
	function getAllFactions() {
		return FACTIONS;
	}

	const flags = ns.flags([
		['faction', 'Sector-12'],
		['work', 'Hacking Contracts'],
		['focus', false],
		['period', 10 * 1000],
	]);
	let faction = 'Sector-12';
	let workType = 'Security Work';
	let focus = false;
	let period = 10 * 1000;
	ns.workForFaction(faction, workType, focus);
	let player = {};
	do {
		player = ns.getPlayer();
		await ns.sleep(duration);
	} while (
		player.agility < 100 &&
		player.dexterity < 100 &&
		player.defense < 100 &&
		player.strength < 100
	)
	ns.stopAction();
}


const FACTIONS = [
	`Illuminati`,
	`Daedalus`,
	`The Covenant`,
	`Ecorp`,
	`MegaCorp`,
	`Bachman & Associates`,
	`Blade Industries`,
	`NWO`,
	`Clarke Incorporated`,
	`OmniTek Incorporated`,
	`Four Sigma`,
	`KuaiGong International`,
	`Fulcrum Secret Technologies`,
	`BitRunners`,
	`The Black Hand`,
	`NiteSec`,
	`Aevum`,
	`Chongqing`,
	`Ishima`,
	`New Tokyo`,
	`Sector-12`,
	`Volhaven`,
	`Speakers for the Dead`,
	`The Dark Army`,
	`The Syndicate`,
	`Silhouette`,
	`Tetrads`,
	`Slum Snakes`,
	`Netburners`,
	`Tian Di Hui`,
	`CyberSec`,
	`Bladeburners`,
	`Church of the Machine God`,
];


export function autocomplete(data, args) {
	return FACTIONS;
}