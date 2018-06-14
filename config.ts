export interface Config {
  uri: string,
  keywords: Array<string>,
  continuous?: boolean,
  runEvery?: number | string,
  notify?: boolean,
}
