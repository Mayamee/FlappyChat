import MessageBody from './MessageBody'
import MessageBox from './MessageBox'
import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'

const Message = ({ children }) => <div className="d-flex flex-column h-100 w-100">{children}</div>
Message.Header = MessageHeader
Message.Body = MessageBody
Message.Input = MessageForm
Message.Box = MessageBox

export default Message
