import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
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
import Error from './Error/Error'
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
import { logout } from '@/redux/slices/authSlice'
import profanityFilter from '@/utils/profanityFilter/profanityFilter'

const modalTypes = {
  nomodal: 'nomodal',
  addChannel: 'add',
  deleteChannel: 'delete',
  renameChannel: 'rename',
}

const ChatBox = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const channels = useSelector(selectAllChannels)
  const channelEntities = useSelector(selectChannelEntities)
  const currentChannel = useSelector(selectActiveChannel)
  const messagesByChannel = useSelector(selectMessagesByChannelId)
  const totalMessagesById = useSelector(selectTotalMessagesByChannelId)
  const user = useSelector(selectUser)

  const [modalType, setModalType] = useState(modalTypes.nomodal)
  const [itemIdx, setItemIdx] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const [isFetching, setFetching] = useState(false)
  const [fetchingError, setFetchingError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const socket = useSocketContext()
  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => {
      // console.log('connected')
    })
    socket.on('disconnect', () => {
      // console.log('disconnected')
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
    // eslint-disable-next-line consistent-return
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('newMessage')
      socket.off('newChannel')
      socket.off('removeChannel')
      socket.off('renameChannel')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, currentChannel])

  useLayoutEffect(() => {
    // eslint-disable-next-line functional/no-let
    let isRequestCanceled = false
    const abortController = new AbortController()
    const fetchChatData = async () => {
      const authData = localStorage.getItem('authData')
      if (!authData) throw new Error('No auth token provided')
      const data = JSON.parse(authData)
      try {
        setFetching(true)
        setFetchingError(null)
        // eslint-disable-next-line no-promise-executor-return
        const { data: response } = await ChatService.getChannelsData(
          data.token,
          abortController.signal
        )
        if (isRequestCanceled) return
        dispatch(setActiveChannel(response.currentChannelId))
        dispatch(setChannels(response.channels))
        dispatch(setMessages(response.messages))
      } catch (error) {
        if (isRequestCanceled) return
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('authData')
          dispatch(logout())
          toast.error(t('chatPage.toasts.sessionExpired'))
          return
        }
        toast.error(t('chatPage.toasts.fetchingError'))
        setFetchingError(error)
        throw error
      } finally {
        if (!isRequestCanceled) setFetching(false)
      }
    }
    fetchChatData()
    return () => {
      isRequestCanceled = true
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount])
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
        dispatch(addChannel(data.data))
        dispatch(setActiveChannel(data.data.id))
        toast.success(t('chatPage.toasts.channelAdded', { name }))
      }
    })
  }
  const handleModalDeleteChannel = () => {
    socket.emit('removeChannel', { id: itemIdx }, (data) => {
      if (data.status === 'ok') {
        toast.success(t('chatPage.toasts.channelRemoved', { name: channelEntities[itemIdx].name }))
      }
    })
  }
  const handleModalRenameChannel = (name) => {
    socket.emit('renameChannel', { id: itemIdx, name }, (data) => {
      if (data.status === 'ok') {
        toast.success(t('chatPage.toasts.channelRenamed', { name: channelEntities[itemIdx].name }))
      }
    })
  }
  const handleValidateChannel = ({ name }) => {
    const processedName = name.trimEnd().replace(/\s+/g, ' ')
    const errors = {}
    if (processedName.length === 0) {
      errors.name = t('chatPage.modals.errors.emptyLength')
    }
    if (processedName.length > 20) {
      errors.name = t('chatPage.modals.errors.minLength')
    }
    channels.forEach((channel) => {
      if (processedName === channel.name) {
        errors.name = t('chatPage.modals.errors.alreadyExist')
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
    const filteredText = profanityFilter(text)
    const payload = {
      body: filteredText,
      channelId: currentChannel,
      username: user,
    }
    socket.emit('newMessage', payload, ({ status }) => {
      if (status === 'ok') {
        // some logic
      }
    })
  }

  const handleRetry = () => setRetryCount((p) => p + 1)

  if (isFetching) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100 w-100 bg-white shadow-lg">
        <Spinner as="span" animation="border" size="xl" role="status" aria-hidden="true" />
      </div>
    )
  }
  if (fetchingError) {
    return (
      <Error>
        <div className="text-center">
          <div
            className="mb-3 h5"
            style={{
              maxWidth: '600px',
            }}
          >
            {t('chatPage.error.text')}
          </div>
          <Button onClick={handleRetry}>{t('chatPage.error.button')}</Button>
        </div>
      </Error>
    )
  }

  return (
    <>
      <Row className="h-100 shadow-lg mx-auto">
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
            title={t('chatPage.messages.header.channelName', {
              name: channelEntities[currentChannel]?.name,
            })}
            description={t('chatPage.messages.header.messagesCounter', {
              count: totalMessagesById,
            })}
            form={<MessageForm onSubmit={handleSendMessage} />}
          >
            {messagesByChannel.map((message) => (
              <div key={message.id} className="text-break">
                <strong>{message.username}</strong>
                :&nbsp;
                {message.body}
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
