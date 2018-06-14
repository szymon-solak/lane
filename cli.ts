import * as minimist from 'minimist'
import * as isUrl from 'is-url'

import main from './'

const config = require('./config.json')

function printHelp() {
  console.log('Lane --help')
  console.log('Usage:')
  console.log('$ lane https://google.com -k search -c 5m')
  console.log('')
  console.log('Flags:')
  console.log('-k, --keywords -> Comma separated list of keywords')
  console.log('-c --continuous -> Interval between calls (can be entered as a number in ms or like `1h`, `5m`)')
  console.log('Without -c flag it will check the site only once')
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
    process.exit()
  }

  if (!cmd || cmd.toLowerCase() === 'help') {
    printHelp()
    process.exit()
  }

  // Check if any of the required parameters is missing
  // Required: url, keywords
  // We already know url exists, so only keywords are checked

  const keywords: string = argv.k || argv.keywords

  if (!keywords) {
    console.error('The argument `keywords` (-k, --keywords) is required')
    process.exit(1)
  }

  // Check if cmd is a valid url
  if (!isUrl(cmd)) {
    console.error('The first argument must be a valid url')
    process.exit(1)
  }

  // Convert keywords to an array and remove whitespace
  const splittedKeywords = keywords
    .split(',')
    .map(keyword => keyword.trim())

  // Update config with flags
  const updatedConfig = Object.assign({}, config, {
    uri: cmd,
    keywords: splittedKeywords,
  })

  updatedConfig.notify = argv.n || argv.notify || config.notify

  const continuous = argv.c || argv.continuous || config.continuous

  if (continuous) {
    updatedConfig.continuous = true
    updatedConfig.runEvery = continuous
  }

  // Everything seems ok, pass to main function
  main(updatedConfig)
}

export default run
