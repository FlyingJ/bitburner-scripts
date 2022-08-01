/** @param {NS} ns */
export async function main(ns) {
	for (let i = 0; i < ns.sleeve.getNumSleeves(); i += 1) {
		ns.tprint(`${JSON.stringify(ns.sleeve.getTask(i))}`);
	}
}