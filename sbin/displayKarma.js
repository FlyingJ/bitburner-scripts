/** @param {NS} ns **/

const getProps = (obj) =>
	Object.entries(obj).find(entry => entry[0]?.startsWith(`__reactProps`))?.[1]?.children?.props;

export async function main(ns) {
	let boxes = Array.from(eval(`document`).querySelectorAll(`[class*=MuiBox-root]`));
	let props = boxes.map(box => getProps(box)).find(x => x?.player);

	if (props) {
		const hook0 = eval("document.getElementById('overview-extra-hook-0')");
		const hook1 = eval("document.getElementById('overview-extra-hook-1')");

		// so that when script is killed, these line disappear
		ns.atExit(() => { hook0.innerHTML = ""; hook1.innerHTML = ""; });

		while (true) {
			try {
				const headers = []
				const values = [];
				// Add script income per second
				headers.push("Karma");
				values.push(ns.nFormat(props.player.karma, "0,0"));
				// TODO: Add more neat stuff

				// Now drop it into the placeholder elements
				hook0.innerText = headers.join(" \n");
				hook1.innerText = values.join("\n");
			} catch (err) { // This might come in handy later
				ns.print("ERROR: Update Skipped: " + String(err));
			}
			await ns.sleep(1000);
		}
	}
}