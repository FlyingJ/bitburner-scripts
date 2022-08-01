/** @param {NS} ns **/
export async function main(ns) {
	// so that when script is killed, these line disappear
	ns.atExit(() => { hook0.innerHTML = ""; hook1.innerHTML = ""; });

    // // const doc = document; // This is expensive! (25GB RAM) Perhaps there's a way around it? ;)
    // // can use this to get rid of that cost too
    // const doc = eval("document");

    // const hook0 = doc.getElementById('overview-extra-hook-0');
    // const hook1 = doc.getElementById('overview-extra-hook-1');

    const hook0 = eval("document.getElementById('overview-extra-hook-0')");
    const hook1 = eval("document.getElementById('overview-extra-hook-1')");
    while (true) {
        try {
            const headers = []
            const values = [];
            // Add script income per second
            headers.push("ScrInc");
            values.push(ns.getScriptIncome()[0].toPrecision(5) + '/sec');
            // Add script exp gain rate per second
            headers.push("ScrExp");
            values.push(ns.getScriptExpGain().toPrecision(5) + '/sec');
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