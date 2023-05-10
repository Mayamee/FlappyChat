import ChatBox from '@/components/ChatBox/ChatBox'
import { SocketProvider } from '@/hooks/useSocket'
import { API_CONFIG } from '@/vars'

const Chat = () => (
  <SocketProvider
    opts={{
      url: API_CONFIG.SOCKET_URL,
    }}
  >
    <ChatBox />
  </SocketProvider>
)

export default Chat
