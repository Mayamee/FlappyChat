export default function getTextForMessage(count) {
  switch (count) {
    case 1:
      return '1 сообщение'
    case 2:
    case 3:
    case 4:
      return `${count} сообщения`
    default:
      return `${count} сообщений`
  }
}
