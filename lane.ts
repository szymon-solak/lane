import * as ora from 'ora'

import pipe from './lib/pipe'
import crawl from './lib/crawl'
import cleanUpContent from './lib/cleanUpContent'
import findMatches from './lib/findMatches'

interface LaneArguments {
  uri: string,
  selector?: string,
  keywords: Array<string>
}

const lane = async ({
  uri,
  selector = 'body',
  keywords,
}: LaneArguments) => {
  const spinner = ora('Fetching data..')
  spinner.start()

  const content = await crawl(uri, selector)
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

  return matches
}

export default lane
