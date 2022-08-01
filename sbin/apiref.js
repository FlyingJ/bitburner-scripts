// poor man's api reference

/** @param {NS} ns **/
export async function main(ns) {
	function list(obj, indent) {
		for (const key in obj) {
			ns.tprintf("%s", "    ".repeat(indent) + key + ": " + typeof obj[key]);
			if (typeof obj[key] == "object")
				list(obj[key], indent + 1);
		}
	}

	//list(ns, 0);
	let n = 1;
	list(Object.getPrototypeOf(n), 0);
}