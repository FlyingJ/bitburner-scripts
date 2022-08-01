/** @param {NS} ns **/
export async function main(ns) {
    const doc = eval(`document`);
    doc.completely_unused_field = true;
    await ns.sleep(15 * 1000);
}