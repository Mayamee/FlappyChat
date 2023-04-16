import { Stack } from 'react-bootstrap'

const Messages = ({ title, description, children, form }) => (
  <div className="d-flex flex-column h-100 w-100">
    <div className="h-80px shadow px-3 d-flex align-items-center">
      <div>
        <div>
          <b>{title}</b>
        </div>
        <div>{description}</div>
      </div>
    </div>
    <div className="flex-fill d-flex flex-column bg-white p-3">
      <Stack gap={3}>{children}</Stack>
      {form}
    </div>
  </div>
)
Messages.defaultProps = {
  title: 'Message Header',
  description: 'Some description here',
  form: null,
}

export default Messages
