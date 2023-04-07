import { ButtonGroup, Dropdown, Nav } from 'react-bootstrap'
import clsx from 'clsx'

const Channel = ({ id, name, active, removable, onDelete, onRename }) => {
  const buttonClasses = clsx('w-100 rounded-0 text-start btn', {
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
          {name}
        </button>
        <Dropdown.Toggle variant={active ? 'secondary' : null} className="flex-grow-0" split />
        <Dropdown.Menu>
          <Dropdown.Item onClick={onDelete}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={onRename}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  )
}
export default Channel
