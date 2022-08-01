/** @param {NS} ns */
export async function main(ns) {
	ns.tail();

	let server = ns.getServer();
	ns.print(`${JSON.stringify(server)}`);
	if (!server.backdoorInstalled) { ns.print(`Should backdoor ${server.hostname}`); }
}