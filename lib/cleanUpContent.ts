const cleanUpContent = (content: string): Array<string> => content
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean)

export default cleanUpContent
