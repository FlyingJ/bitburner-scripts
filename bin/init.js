/** @param {NS} ns */
export async function main(ns) {
	[
		'/bin/pwn.js',
		'/bin/faqJoin.js',
		'/bin/homeTor.js',
		'/sbin/bank.js',
		'/bin/homeRam.js',
		'/bin/homeCores.js',
		'/bin/hacknetBuilder.js',
		// '/bin/sleeveStart.js',
		'/sbin/displayKarma.js',
	].forEach((program) => { ns.run(program); })

	await ns.sleep(2 * 1000);
	ns.run('/scripts/localHack.js', 1, 'n00dles');
}