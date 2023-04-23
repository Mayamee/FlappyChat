import { ButtonGroup, Dropdown, Nav } from 'react-bootstrap'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

const Channel = ({ id, name, active, removable, onDelete, onRename }) => {
  const { t } = useTranslation()
  const buttonClasses = clsx('w-100 rounded-0 text-start btn text-truncate', {
    'btn-secondary': active,
  })
  if (!removable) {
    return (
      <Nav.Item as="li">
        <button data-id={id} type="button" className={buttonClasses}>
          <span className="me-1">#</span>
          {name}
        </button>
      </Nav.Item>
    )
  }
  return (
    <Nav.Item as="li">
      <Dropdown as={ButtonGroup} className="w-100">
        <button data-id={id} type="button" className={buttonClasses}>
          <span className="me-1">#</span>
          {name}
        </button>
        <Dropdown.Toggle variant={active ? 'secondary' : null} className="flex-grow-0" split>
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onDelete}>{t('chatPage.channels.dropMenu.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={onRename}>{t('chatPage.channels.dropMenu.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  )
}
export default Channel
