import { Container } from 'react-bootstrap'
import ChatBox from '@/components/ChatBox/ChatBox'
import { SocketProvider } from '@/hooks/useSocket'
import { API_CONFIG } from '@/vars'

const Chat = () => (
  <Container className="flex-fill py-4">
    <SocketProvider
      opts={{
        url: API_CONFIG.SOCKET_URL,
      }}
    >
      <ChatBox />
    </SocketProvider>
  </Container>
)

export default Chat
