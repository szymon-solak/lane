# Lane

Lane is a small utility package which checks if selected webpage contains one or more keywords.
It can run in the background periodically checking in for a match and notifying you when that occurs. E.g. you are waiting for a website to publish a certain article, so instead of checking every now and then you can use this script to do it for you.

It can be used from the command line or as a module.

# CLI usage

To install lane as a global command use `npm link` after installing the dependencies. If you prefer not adding it globally you can use `./bin/lane` whle being in project directory.

Usage:
```bash
$ lane https://google.com -k search -c 5m
```

Flags:
  - `-v, --version`: Returns installed version
  - `-k, --keywords`: Comma separated list of keywords to look for
  - `-c, --continuous`: Interval between calls (can be entered as a number in ms or like `1h`, `5m`)

Config:

For the sake of convenience you can specify all settings in the `config.json` file according to tempate in `config.ts` and then run the command without arguments. If you will add arguments to the command they will override config settings.
