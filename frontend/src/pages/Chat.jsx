import { Container } from 'react-bootstrap';
import ChatBox from '@/components/ChatBox/ChatBox';
import { SocketProvider } from '@/hooks/useSocket';
import { SOCKET_URL } from '@/vars/socket';

const Chat = () => (
  <Container className="flex-fill py-4">
    <SocketProvider
      opts={{
        url: SOCKET_URL,
      }}
    >
      <ChatBox />
    </SocketProvider>
  </Container>
);

export default Chat;
