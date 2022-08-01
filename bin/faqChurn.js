const workTypes = {
	ops: {
		name: 'Field Work',
		skills: ['hacking', 'strength', 'defense', 'dexterity', 'agility', 'charisma'],
	},
	dev: {
		name: 'Hacking Contracts',
		skills: ['hacking'],
	},
	sec: {
		name: 'Security Work',
		skills: ['hacking', 'strength', 'defense', 'dexterity', 'agility'],
	},
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
	return [...data.flags];
}

export function validEnum(value, validValues) {
	return validValues.includes(value);
}

export function getAllFactions() {
		return FACTIONS;
	}
	

/** @param {NS} ns */
export async function main(ns) {
	function goalAchieved(ctx) {
		let achieved = true;
		workTypes[ctx.work]['skills'].forEach((skill) => {
			achieved &= (ns.getPlayer()[skill] > ctx.goal);
		});
		return achieved;
	}

	const schema = [
		['faction', 'Sector-12'],
		['goal', 100],
		['work', 'dev'],
		['focus', false],
		['period', 10 * 1000],
	];
	const ctx = ns.flags(schema);

	// input validation
	let validInput = validEnum(ctx.faction, getAllFactions()) &&
		validEnum(ctx.work, Object.getOwnPropertyNames(workTypes));
	if (!validInput) { ns.tprint('You suck'); ns.exit(); }

	// cycle faction work until goal achieved
	do {
		ns.workForFaction(ctx.faction, workTypes[ctx.work].name, ctx.focus);
		await ns.sleep(ctx.period);
	} while (!goalAchieved(ctx));

	ns.tprint('Goal Achieved!');
	ns.stopAction();
}