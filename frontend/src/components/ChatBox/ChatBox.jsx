import { useEffect } from 'react'
import { PlusSquare } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { setActiveChannel, setChannels } from '@/redux/slices/channelsSlice'
import ChatService from '@/services/ChatService'
import getEntities from '@/utils/getEntities/getEntities'
import Message from './Message/Message'
import Channels from './Channels/Channels'
import AddChannelModal from './Modal/AddChannelModal'
import RenameChannelModal from './Modal/RenameChannelModal'
import DeleteChannelModal from './Modal/DeleteChannelModal'

const ChatBox = () => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => {
    const { entities, ids } = state.channels
    return ids.map((id) => entities[id])
  })
  const currentChannel = useSelector((state) => {
    const { activeChannel } = state.channels
    return activeChannel
  })
  useEffect(() => {
    const fetchChannels = async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No auth token')
      try {
        const { data } = await ChatService.getChannelsData(token)
        const [channelEntities, channelIds] = getEntities(data.channels)
        dispatch(setActiveChannel(data.currentChannelId))
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
  const handleChannelChange = (id) => dispatch(setActiveChannel(id))
  const handleChannelDelete = (id) => {}
  const handleChannelRename = (id) => {}
  const renderModal = (type) => {
    if (type === 'addChannel') return <AddChannelModal />
    if (type === 'renameChannel') return <RenameChannelModal />
    if (type === 'deleteChannel') return <DeleteChannelModal />
    return null
  }
  return (
    <>
      <Row className="h-100 shadow">
        <Col xs={4} sm={3} lg={2} className="h-100 bg-light p-0 border-end">
          <div className="chats-block d-flex flex-column h-100 w-100">
            <div className="chats-header px-2 h-80px d-flex align-items-center border-bottom">
              <div className="chats-header-title flex-fill">
                <b>Каналы</b>
              </div>
              <button type="button" className="p-0 btn text-primary btn-group-vertical">
                <PlusSquare width={20} height={20} />
              </button>
            </div>
            <div className="chats-body mt-2 flex-fill">
              <Channels
                activeChannel={currentChannel}
                channels={channels}
                onChannelChange={handleChannelChange}
                onChannelDelete={handleChannelDelete}
                onChannelRename={handleChannelRename}
              />
            </div>
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
      {renderModal()}
    </>
  )
}

export default ChatBox
