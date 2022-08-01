/** @param {NS} ns */
export async function main(ns) {
	[
		`Export`,
		`Smart Supply`,
		`Market Research - Demand`,
		`Market Data - Competition`,
		`VeChain`,
		`Shady Accounting`,
		`Government Partnership`,
		`Warehouse API`,
		`Office API`,
	].forEach((upgrade) => {
		if (!ns.corporation.hasUnlockUpgrade(upgrade)) { ns.corporation.unlockUpgrade(upgrade); }
	})
}