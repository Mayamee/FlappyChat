import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { setActiveChannel, setChannels, selectAllChannels } from '@/redux/slices/channelsSlice'
import ChatService from '@/services/ChatService'
import Channels from './Channels/Channels'
import AddChannelModal from './Modal/AddChannelModal'
import RenameChannelModal from './Modal/RenameChannelModal'
import DeleteChannelModal from './Modal/DeleteChannelModal'
import Messages from './Messages/Messages'
import MessageForm from './Messages/MessageForm'
import selectActiveChannel from '@/redux/selectors/selectActiveChannel'
import { useSocketContext } from '@/hooks/useSocket'
import { selectAllMessages, setMessages } from '@/redux/slices/messagesSlice'

const modalTypes = {
  nomodal: 'nomodal',
  addChannel: 'add',
  deleteChannel: 'delete',
  renameChannel: 'rename',
}

const ChatBox = () => {
  const dispatch = useDispatch()
  const channels = useSelector(selectAllChannels)
  const currentChannel = useSelector(selectActiveChannel)
  const messages = useSelector(selectAllMessages)

  const [modalType, setModalType] = useState(modalTypes.nomodal)
  const [itemIdx, setItemIdx] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const socket = useSocketContext()
  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    socket.on('newMessage', (message) => {
      console.log(message)
    })
  }, [socket])

  useEffect(() => {
    const fetchChatData = async () => {
      const authData = localStorage.getItem('authData')
      if (!authData) throw new Error('No auth token provided')
      const data = JSON.parse(authData)
      try {
        const { data: response } = await ChatService.getChannelsData(data.token)
        dispatch(setActiveChannel(response.currentChannelId))
        dispatch(setChannels(response.channels))
        dispatch(setMessages(response.messages))
      } catch (error) {
        console.log(error)
      }
    }
    fetchChatData()
  }, [])
  const handleCloseModal = () => {
    setModalOpen(false)
    setTimeout(() => {
      setModalType(modalTypes.nomodal)
    }, 500)
  }
  const handleAddChannel = () => {
    setModalType(modalTypes.addChannel)
    setModalOpen(true)
  }
  const handleChannelChange = (id) => dispatch(setActiveChannel(id))
  const handleChannelDelete = (id) => {
    setModalType(modalTypes.deleteChannel)
    setItemIdx(id)
    setModalOpen(true)
  }
  const handleChannelRename = (id) => {
    setModalType(modalTypes.renameChannel)
    setItemIdx(id)
    setModalOpen(true)
  }
  const handleModalAddChannel = (name) => {
    console.log(`some side logic - Add modal with name ${name}`)
  }
  const handleModalDeleteChannel = () => {
    // itemIdx
    console.log(`some side logic - Delete modal with item ${itemIdx}`)
  }
  const handleModalRenameChannel = (name) => {
    // itemIdx
    console.log(`some side logic - Rename modal to ${name} with item ${itemIdx}`)
  }
  const renderModal = () => {
    switch (modalType) {
      case modalTypes.addChannel: {
        return (
          <AddChannelModal
            onAction={handleModalAddChannel}
            show={isModalOpen}
            onHide={handleCloseModal}
          />
        )
      }
      case modalTypes.renameChannel: {
        const { name } = channels[itemIdx - 1]
        return (
          <RenameChannelModal
            name={name}
            onAction={handleModalRenameChannel}
            show={isModalOpen}
            onHide={handleCloseModal}
          />
        )
      }
      case modalTypes.deleteChannel: {
        return (
          <DeleteChannelModal
            onAction={handleModalDeleteChannel}
            show={isModalOpen}
            onHide={handleCloseModal}
          />
        )
      }
      default: {
        return null
      }
    }
  }
  return (
    <>
      <Row className="h-100 shadow">
        <Col xs={4} sm={3} lg={2} className="h-100 bg-light p-0 border-end">
          <Channels
            channels={channels}
            activeChannel={currentChannel}
            onChannelAdd={handleAddChannel}
            onChannelChange={handleChannelChange}
            onChannelDelete={handleChannelDelete}
            onChannelRename={handleChannelRename}
          />
        </Col>
        <Col xs={8} sm={9} lg={10} className="h-100 bg-light p-0">
          <Messages title="#general" description="0 сообщений" form={<MessageForm />}>
            {messages.map((message) => (
              <div key={message.id} className="msg-box">
                message
              </div>
            ))}
          </Messages>
        </Col>
      </Row>
      {renderModal()}
    </>
  )
}

export default ChatBox
