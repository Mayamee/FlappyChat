import { useEffect, useState } from 'react'
import { PlusSquare } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { setChannels } from '@/redux/slices/channelsSlice'
import ChatService from '@/services/ChatService'
import getEntities from '@/utils/getEntities/getEntities'
import Message from './Message/Message'

const ChatBox = () => {
  // const [isPending, setIsPending] = useState(false)
  const [currentChannelId, setCurrentChannelId] = useState(null)
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels.channels)
  useEffect(() => {
    const fetchChannels = async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No auth token')
      try {
        const { data } = await ChatService.getChannelsData(token)
        setCurrentChannelId(data.currentChannelId)
        const [channelEntities, channelIds] = getEntities(data.channels)
        dispatch(
          setChannels({
            entities: channelEntities,
            ids: channelIds,
          })
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetchChannels()
  }, [])
  return (
    <Row className="h-100 shadow">
      <Col xs={4} sm={3} lg={2} className="h-100 bg-light p-0 ps-3 border-end">
        <div className="chats-block d-flex flex-column h-100 w-100">
          <div className="chats-header h-80px d-flex align-items-center">
            <div className="chats-header-title flex-fill">
              <b>Каналы</b>
            </div>
            <button type="button" className="p-1 btn text-primary btn-group-vertical">
              <PlusSquare width={20} height={20} />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <div className="chats-body flex-fill">Body</div>
        </div>
      </Col>
      <Col xs={8} sm={9} lg={10} className="h-100 bg-light p-0">
        <Message>
          <Message.Header title="#general" description="0 сообщений" />
          <Message.Body>
            <Message.Box />
            <Message.Input />
          </Message.Body>
        </Message>
      </Col>
    </Row>
  )
}

export default ChatBox