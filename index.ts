import * as ms from 'ms'

import lane from './lane'
import { Config } from './config'
import notify from './lib/notify'


/*
 * Wrapper handles running the main function
 * in specified interval, notifying user,
 * and cleaning up the interval afterwards.
 */

const wrapper = async (args: Config, onFound?: Function) =>
  new Promise((resolve, reject) => {
    let interval

    const runLane = () => lane(args)
      .then((matches) => {
        if (interval) clearInterval(interval)

        // If user supplied callback function call it
        if (onFound) {
          onFound(matches)
        }

        if (args.notify) notify(matches[0].line)

        resolve(matches)
      })
      .catch(reject)

    if (args.continuous) {
      const runEvery = ms(args.runEvery)

      interval = setInterval(
        runLane,
        runEvery
      )
    }

    // Run once at start
    runLane()
  })

export default wrapper
