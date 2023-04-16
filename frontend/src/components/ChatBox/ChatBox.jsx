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

  const [modalType, setModalType] = useState(modalTypes.nomodal)
  const [itemIdx, setItemIdx] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {}, [])

  useEffect(() => {
    const fetchChannels = async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No auth token')
      try {
        const { data } = await ChatService.getChannelsData(token)
        dispatch(setActiveChannel(data.currentChannelId))
        dispatch(
          setChannels(
            data.channels.concat(
              { id: 3, name: 'custom_channel', removable: true },
              { id: 4, name: 'custom_channel2', removable: true }
            )
          )
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetchChannels()
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
            <div className="msg-box-message">01</div>
            <div className="msg-box-message">01</div>
          </Messages>
        </Col>
      </Row>
      {renderModal()}
    </>
  )
}

export default ChatBox
