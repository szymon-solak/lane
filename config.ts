export interface Config {
  uri: string,
  keywords: Array<string>,
  selector?: string,
  continuous?: boolean,
  runEvery?: number | string,
  notify?: boolean,
}
