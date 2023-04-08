import { useEffect, useState } from 'react'
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

const modalTypes = {
  nomodal: 'nomodal',
  addChannel: 'add',
  deleteChannel: 'delete',
  renameChannel: 'rename',
}

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
  const [modalType, setModalType] = useState(modalTypes.nomodal)
  const [itemIdx, setItemIdx] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    const fetchChannels = async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No auth token')
      try {
        const { data } = await ChatService.getChannelsData(token)
        const [channelEntities, channelIds] = getEntities(
          data.channels.concat(
            { id: 3, name: 'custom_channel', removable: true },
            { id: 4, name: 'custom_channel2', removable: true }
          )
        )
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
  const handleCloseModal = () => {
    setModalOpen(false)
    // Change modal type to invoke component will unmount
    // while reconsilation alghoritm
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
          <div className="chats-block d-flex flex-column h-100 w-100">
            <div className="chats-header px-2 h-80px d-flex align-items-center border-bottom">
              <div className="chats-header-title flex-fill">
                <b>Каналы</b>
              </div>
              <button
                onClick={handleAddChannel}
                type="button"
                className="p-0 btn text-primary btn-group-vertical"
              >
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
