import * as notifier from 'node-notifier'

const notify = (text: string) => {
  const length = Math.min(
    text.length,
    60
  )

  const dots = (text.length > 60)
    ? '...'
    : ''

  const message = `${text.slice(0, length)}${dots}`

  notifier.notify({
    title: 'Lane: Match found!',
    message,
  })
}

export default notify
