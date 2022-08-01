export function autocomplete(data, args) {
	return [...data.servers];
}

/** @param {NS} ns */
export async function main(ns) {
	function getServerAvailableRam(server) {
		return ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
	}

	let target = ns.args[0];

	if (target) {
		ns.tail();
		let script = `/bin/analEyez.js`;
		let scriptRam = ns.getScriptRam(script);
		let scriptSource = `home`;
		if (ns.getServerMaxRam(target) > scriptRam) {
			await ns.scp(script, scriptSource, target);
			if (scriptRam > getServerAvailableRam(target)) { ns.killall(target); }
			ns.exec(script, target);
		} else {
			ns.tprint(`Your ${target} sukz`);
		}
	} else {
		ns.tprint(`Your suqs`);
	}
}