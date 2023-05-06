import clsx from 'clsx'
import styles from './Message.module.scss'

const Message = ({ username, body, alignEnd }) => {
  return (
    <div
      className={clsx('text-break d-flex', {
        'justify-content-end': alignEnd,
      })}
    >
      <div
        className={clsx(styles['message-body'], {
          [styles['message-owner']]: alignEnd,
        })}
      >
        {username && <strong>{username}:&nbsp;</strong>}
        {body}
      </div>
    </div>
  )
}
Message.defaultProps = {
  username: null,
  body: 'Message body',
  alignEnd: false,
}
export default Message
