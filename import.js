let config = {
    folder: 'bin',
    rootUrl: 'https://raw.githubusercontent.com/FlyingJ/bitburner-scripts/main/',
    serverPrefix: 'j4ys3rv',
};
/*
* This will import all files listed in importFiles.
*/
export async function main(ns) {
    let filesImported = await importFiles(ns);
    ns.tprint('='.repeat(20));
    if (filesImported) {
        ns.tprint('Hey! Thank you for downloading the BitBurner Scripts.');
        ns.tprint(`You've installed these in the ${getFolder()} directory.`);
        ns.tprint(
            `A good place to start is running \`run /${getFolder()}/hax.js\``
        );
    } else {
        ns.tprint(
            'You had some issues downloading files, please reach out to the repo maintainer or check your config.'
        );
    }
}

async function importFiles(ns) {
    let files = [
        'autoHack.js',
        'autoRemoteHack.js',
        'dashboard.js',
        'gangManager.js',
        'hack.js',
        'hacknetManager.js',
        'hacknetNodeManager.js',
        'hacknetUpgradeManager.js',
        'hax.js',
        'localHack.js',
        'purchaseServers.js',
        'remoteHack.js',
        'serverStatus.js',
        'stockManager.js',
    ];
    let filesImported = true;
    for (let file of files) {
        let remoteFileName = `${getRootUrl()}/${getFolder()}/${file}`;
        let result = await ns.wget(remoteFileName, `/${getFolder()}/${file}`);
        filesImported = filesImported && result;
        ns.tprint(`File: ${file}: ${result ? '✔️' : '❌'}`);
    }
    return filesImported;
}

export function getFolder() { return config.folder; }
export function getRootUrl() { return config.rootUrl; }
export function getServerPrefix() { return config.serverPrefix; }

export function getHackScript() { return `/${getFolder()}/hack.js`; }