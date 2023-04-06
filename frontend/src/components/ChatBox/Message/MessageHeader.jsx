const MessageHeader = ({ title, description }) => {
  if (!title) return null
  return (
    <div className="h-80px shadow px-3 d-flex align-items-center">
      <div>
        <div>
          <b>{title}</b>
        </div>
        <div>{description}</div>
      </div>
    </div>
  )
}
MessageHeader.defaultProps = {
  title: 'Message Header',
  description: 'Some description here',
}
export default MessageHeader
