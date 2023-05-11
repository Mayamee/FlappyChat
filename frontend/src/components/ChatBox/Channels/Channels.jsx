import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { PlusSquare } from 'react-bootstrap-icons'
import { Nav } from 'react-bootstrap'
import Channel from './Channel'

const headerHeight = 80

const Channels = ({
  activeChannel,
  channels,
  onChannelChange,
  onChannelDelete,
  onChannelRename,
  onChannelAdd,
  ownAddCounter,
  ownRemoveCounter,
}) => {
  const { t } = useTranslation()
  const channelsListRef = useRef(null)
  useEffect(() => {
    if (!channelsListRef.current) return
    channelsListRef.current.scrollTop = channelsListRef.current.scrollHeight
  }, [ownAddCounter])
  useEffect(() => {
    if (!channelsListRef.current) return
    channelsListRef.current.scrollTop = 0
  }, [ownRemoveCounter])
  if (channels.length === 0) return 'No channels'
  const handleChannelChange = (e) => {
    const id = Number(e.target.dataset.id)
    if (!id) return
    onChannelChange(id)
  }
  const handleDeleteChannel = (id) => () => {
    onChannelDelete(id)
  }
  const handleRenameChannel = (id) => () => {
    onChannelRename(id)
  }
  const handleClick = (id, isShouldCloseMenu) => () => {
    onChannelChange(id, isShouldCloseMenu)
  }
  return (
    <div className="chats-block d-flex flex-column h-100 w-100">
      <div
        className="chats-header px-2 d-flex align-items-center border-bottom"
        style={{
          height: headerHeight,
        }}
      >
        <div className="chats-header-title flex-fill">
          <b>{t('chatPage.channels.header')}</b>
        </div>
        <button
          onClick={onChannelAdd}
          type="button"
          className="p-0 btn text-primary btn-group-vertical"
        >
          <PlusSquare width={20} height={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <div
        ref={channelsListRef}
        className="chats-body mt-2 flex-fill overflow-auto"
        style={{
          height: `calc(100% - ${headerHeight}px)`,
        }}
      >
        <Nav
          onClick={handleChannelChange}
          as="ul"
          variant="pills"
          className="nav-fill px-1 pb-2 d-block"
        >
          {channels.map((channel) => (
            <Channel
              key={channel.id}
              id={channel.id}
              active={activeChannel === channel.id}
              name={channel.name}
              removable={channel.removable}
              onClick={handleClick(channel.id, false)}
              onDelete={handleDeleteChannel(channel.id)}
              onRename={handleRenameChannel(channel.id)}
            />
          ))}
        </Nav>
      </div>
    </div>
  )
}
Channels.defaultProps = {
  activeChannel: null,
  channels: [],
  onChannelChange: () => {},
  onChannelDelete: () => {},
  onChannelRename: () => {},
  onChannelAdd: () => {},
  ownAddCounter: 0,
}

export default Channels
