import * as xray from 'x-ray'

const crawl = (
  uri: string,
  selector: string
): Promise<string> => new Promise((resolve, reject) => {
  const x = xray()

  x(uri, selector)((err, content) => {
    if (err) reject(err)
    resolve(content)
  })
})

export default crawl
