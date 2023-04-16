import { Container } from 'react-bootstrap'
import ChatBox from '@/components/ChatBox/ChatBox'
import { SocketProvider } from '@/hooks/useSocket'

const Chat = () => {
  return (
    <Container className="flex-fill py-4">
      <SocketProvider
        opts={{
          url: 'http://localhost:8080',
        }}
      >
        <ChatBox />
      </SocketProvider>
    </Container>
  )
}

export default Chat
