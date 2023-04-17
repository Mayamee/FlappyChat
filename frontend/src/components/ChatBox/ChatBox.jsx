import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import {
  setActiveChannel,
  setChannels,
  selectAllChannels,
  addChannel,
  removeChannel,
  updateChannel,
  selectChannelEntities,
  setDefaultActiveChannel,
} from '@/redux/slices/channelsSlice'
import ChatService from '@/services/ChatService'
import Channels from './Channels/Channels'
import AddChannelModal from './Modal/AddChannelModal'
import RenameChannelModal from './Modal/RenameChannelModal'
import DeleteChannelModal from './Modal/DeleteChannelModal'
import Messages from './Messages/Messages'
import MessageForm from './Messages/MessageForm'
import selectActiveChannel from '@/redux/selectors/selectActiveChannel'
import { useSocketContext } from '@/hooks/useSocket'
import {
  addMessage,
  selectMessagesByChannelId,
  selectTotalMessagesByChannelId,
  setMessages,
} from '@/redux/slices/messagesSlice'
import { selectUser } from '@/redux/selectors/selectAuth'
import getTextForMessage from '@/utils/getTextForMessage/getTextForMessage'

const modalTypes = {
  nomodal: 'nomodal',
  addChannel: 'add',
  deleteChannel: 'delete',
  renameChannel: 'rename',
}

const ChatBox = () => {
  const dispatch = useDispatch()
  const channels = useSelector(selectAllChannels)
  const channelEntities = useSelector(selectChannelEntities)
  const currentChannel = useSelector(selectActiveChannel)
  const messagesByChannel = useSelector(selectMessagesByChannelId)
  const totalMessagesById = useSelector(selectTotalMessagesByChannelId)
  const user = useSelector(selectUser)

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
      dispatch(addMessage(message))
    })
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel))
    })
    socket.on('removeChannel', ({ id }) => {
      if (currentChannel === id) {
        dispatch(setDefaultActiveChannel())
      }
      dispatch(removeChannel(id))
    })
    socket.on('renameChannel', (channelInfo) => {
      dispatch(
        updateChannel({
          id: channelInfo.id,
          changes: {
            name: channelInfo.name,
          },
        })
      )
    })
  }, [socket, currentChannel])

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
    socket.emit('newChannel', { name }, (data) => {
      if (data.status === 'ok') {
        // some logic
        dispatch(addChannel(data.data))
        dispatch(setActiveChannel(data.data.id))
      }
    })
  }
  const handleModalDeleteChannel = () => {
    socket.emit('removeChannel', { id: itemIdx }, (data) => {
      if (data.status === 'ok') {
        // some logic
      }
    })
  }
  const handleModalRenameChannel = (name) => {
    socket.emit('renameChannel', { id: itemIdx, name }, (data) => {
      if (data.status === 'ok') {
        // some logic
      }
    })
  }
  const handleValidateChannel = ({ name }) => {
    const errors = {}
    if (name.length === 0) {
      errors.name = 'Пустое название канала'
    }
    if (name.length > 20) {
      errors.name = 'Название канала не должно превышать 20 символов'
    }
    channels.forEach((channel) => {
      if (channel.name === name) {
        errors.name = 'Канал с таким именем уже существует'
      }
    })
    return errors
  }
  const renderModal = () => {
    switch (modalType) {
      case modalTypes.addChannel: {
        return (
          <AddChannelModal
            onAction={handleModalAddChannel}
            show={isModalOpen}
            onHide={handleCloseModal}
            onValidate={handleValidateChannel}
          />
        )
      }
      case modalTypes.renameChannel: {
        const { name } = channelEntities[itemIdx]
        return (
          <RenameChannelModal
            name={name}
            show={isModalOpen}
            onAction={handleModalRenameChannel}
            onHide={handleCloseModal}
            onValidate={handleValidateChannel}
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
  const handleSendMessage = (text) => {
    if (!text) return
    const payload = {
      body: text,
      channelId: currentChannel,
      username: user,
    }
    socket.emit('newMessage', payload, ({ status }) => {
      if (status === 'ok') {
        // some logic
      }
    })
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
          <Messages
            title={channelEntities[currentChannel]?.name}
            description={getTextForMessage(totalMessagesById)}
            form={<MessageForm onSubmit={handleSendMessage} />}
          >
            {messagesByChannel.map((message) => (
              <div key={message.id} className="text-break">
                <strong>{message.username}</strong>:&nbsp;{message.body}
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
