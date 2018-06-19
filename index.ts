import * as ora from 'ora'

import { Config } from './config'

import pipe from './lib/pipe'
import crawl from './lib/crawl'
import cleanUpContent from './lib/cleanUpContent'
import findMatches from './lib/findMatches'
import notify from './lib/notify'

const lane = async (args: Config, onFound?: Function) => {
  const selector = args.selector || 'body'
  const keywords = args.keywords
  const spinner = ora('Fetching data..')
  spinner.start()

  const content = await crawl(args.uri, selector)
    .catch((err) => {
      spinner.fail('Error fetching data')
      throw err
    })

  spinner.stop()

  if (!content) return

  const matches = await pipe(
    cleanUpContent,
    findMatches(keywords),
  )(content)

  if (args.notify) notify(matches[0].line)

  // If user supplied callback function call it
  if (onFound) {
    onFound(matches)
  }

  return matches
}

export default lane
