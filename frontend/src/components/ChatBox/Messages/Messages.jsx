import { useEffect, useRef } from 'react'
import { Stack } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/selectors/selectAuth'

const headerHeight = 80

const Messages = ({ title, description, children, form }) => {
  const { t } = useTranslation()
  const currentUser = useSelector(selectUser)
  const messageBoxRef = useRef(null)
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
    }
  }, [children])
  const renderChildren = (data) => {
    if (!data || data?.length === 0) return <div>{t('chatPage.messages.body.placeholder')}</div>
    return data
  }
  return (
    <div className="h-100 w-100">
      <div
        className="shadow px-3 d-flex align-items-center justify-content-between"
        style={{
          height: headerHeight,
        }}
      >
        <div>
          <div>
            <b>{title}</b>
          </div>
          <div>{description}</div>
        </div>
        <div id="id" className="h6">
          ({currentUser})
        </div>
      </div>
      <div
        className="d-flex flex-column bg-white p-3"
        style={{
          height: `calc(100% - ${headerHeight}px)`,
        }}
      >
        <Stack ref={messageBoxRef} className="mb-3 overflow-auto px-3" gap={1}>
          {renderChildren(children)}
        </Stack>
        {form}
      </div>
    </div>
  )
}
Messages.defaultProps = {
  title: 'Message Header',
  description: 'Some description here',
  form: null,
}

export default Messages
