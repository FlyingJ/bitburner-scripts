# bitburner-scripts

This is my ever-evolving repo of BitBurner scripts (forked from ChaelCodes).

You can import these scripts by running the following __from__ __within__ Bitburner.

# Get the importer
```
  [home ~/]> wget https://raw.githubusercontent.com/FlyingJ/bitburner-scripts/main/import.js import.js
```

# Configure your Import
You can configure your import inside `import.js`.
```
  config = {
    folder: 'bin',
    rootUrl: 'https://raw.githubusercontent.com/FlyingJ/bitburner-scripts/main/',
    serverPrefix: 'hackfarm',
  };
```

- `folder` will determine where your scripts are stored
- `rootUrl` is the source. (__Pro__ __Tip__: When you fork this repo, update ```rootUrl``` to point to your repo.)
- `serverPrefix` is the name prefix for your automatically purchased servers. The prefix is, also, used to mask the servers from auto-hacks.

# Run your import!
```
  [home ~/]> run import.js
```
The output is rather straightforward and will tell you whether everything worked. Please reach out and create an issue for troubleshooting. Please include your import.js, and make sure your forked repo is public!

# Explore! Enjoy!
Follow instructions, try help with various commands.
Try running `run /bin/hax.js autoHack` there's numerous commands available there. Explore!

If you see this error:
![image](https://user-images.githubusercontent.com/8124558/101851194-1b246500-3b29-11eb-9986-7b626bdea51d.png)
Open the file using `nano` Save & Close it, and try again. There's a bug.
