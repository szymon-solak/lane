import * as ora from 'ora'

import { Config } from './config'

import pipe from './lib/pipe'
import crawl from './lib/crawl'
import cleanUpContent from './lib/cleanUpContent'
import findMatches from './lib/findMatches'
import notify from './lib/notify'

async function main(args: Config, onFound?: Function) {
  const selector = args.selector || 'body'
  const keywords = args.keywords
  const spinner = ora('Fetching data..')
  spinner.start()

  const content = await crawl(args.uri, selector)
    .catch((err) => {
      console.error(err)
      spinner.fail('Error fetching data')
      return ''
    })

  spinner.stop()

  const matches = await pipe(
    cleanUpContent,
    findMatches(keywords),
  )(content)

  if (args.notify) notify(matches[0].line)

  // If user supplied callback function call it
  if (onFound) {
    onFound(matches)
  }

  console.log(matches)

  return matches
}

export default main
