import { useField } from 'formik'
import { useId } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const FloatingField = ({ label, name, type, required }) => {
  if (!name) throw new Error('Name is required')
  const id = useId()
  const [field] = useField({ name })
  return (
    <FloatingLabel controlId={id} label={label}>
      <Form.Control {...field} name={name} type={type} placeholder={label} required={required} />
    </FloatingLabel>
  )
}
FloatingField.defaultProps = {
  type: 'text',
  label: 'Please set label',
  className: 'mb-3',
  required: false,
}

export default FloatingField
