const workTypes = {
	ops: {
		name: 'Field Work',
		skills: ['hacking', 'strength', 'defense', 'dexterity', 'agility', 'charisma'],
	}
	dev: {
		name: 'Hacking Contracts',
		skills: ['hacking'],
	}
	sec: {
		name: 'Security Work',
		skills: ['hacking', 'strength', 'defense', 'dexterity', 'agility'],
	}
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


/** @param {NS} ns */
export async function main(ns) {

	function goalAchieved(ctx) {

	}

	function getJoinedFactions() {
		return ns.getPlayer().factions;
	}
	function getAllFactions() {
		return FACTIONS;
	}

	const ctx = ns.flags([
		['faction', 'Sector-12'],
		['goal', 100],
		['work', 'hack'],
		['focus', false],
		['period', 10 * 1000],
	]);

	let player = {};
	do {
		player = ns.getPlayer();
		ns.workForFaction(ctx.faction, ctx.work, ctx.focus);
		await ns.sleep(ctx.period);
	} while ( ! goalAchieved(ctx) );
		player.agility < ctx.goal &&
		player.dexterity < goal &&
		player.defense < goal &&
		player.strength < goal
	)
	ns.stopAction();
}
