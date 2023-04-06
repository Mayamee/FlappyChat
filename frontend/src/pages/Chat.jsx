import { Container } from 'react-bootstrap'
import ChatBox from '@/components/ChatBox/ChatBox'

const Chat = () => {
  return (
    <Container className="flex-fill py-4">
      <ChatBox />
    </Container>
  )
}

export default Chat
