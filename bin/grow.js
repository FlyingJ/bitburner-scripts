/* A simple lightweight script that is deployed
 * to remote and local servers to repeatedly grow
 * a particular server.
 * The smaller this is, the more threads can be deployed.
 * args[0] - server name
 * args[1] - threads to attack with
 */
export async function main(ns, args) {
    await growServer(ns, ns.args[0], ns.args[1]);
}

async function growServer(ns, server, threads) {
    let opts = { threads: threads, stock: true };
    while (true) {
        await ns.grow(server, opts);
    }
}