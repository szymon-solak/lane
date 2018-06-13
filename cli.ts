import * as minimist from 'minimist'

// import { Config } from './config'
// import config from './config.json'

function printHelp() {
  console.log('help')
}

function printVersion() {
  const { version } = require('./package.json')
  console.log(version)
}

function run() {
  const argv = minimist(process.argv.slice(2))

  const cmd = argv._[0] || 'help'

  if (argv.version || argv.v) {
    printVersion()
    return
  }

  if (!cmd || cmd.toLowerCase() === 'help') {
    printHelp()
    return
  }
}

export default run
