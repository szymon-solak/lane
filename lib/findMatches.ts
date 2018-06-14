interface Match {
  keyword: string,
  line: string,
  lineNumber: number,
}

const findMatches =
  (keywords: Array<string>) =>
  (content: Array<string>): Array<Match> =>
    content.reduce((acc, line, idx) => {
      const keyword = keywords
        .find(keyword => line.includes(keyword))

      if (!keyword) return acc

      acc.push({
        keyword,
        line,
        lineNumber: idx,
      })

      return acc
    }, [])

export default findMatches
