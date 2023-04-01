import { useField } from 'formik'
import { useId } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const FloatingField = ({ label, isInvalid, name, type, required }) => {
  if (!name) throw new Error('Name is required')
  const id = useId()
  const [field] = useField({ name })
  return (
    <FloatingLabel controlId={id} label={label}>
      <Form.Control
        isInvalid={isInvalid}
        {...field}
        name={name}
        type={type}
        placeholder={label}
        required={required}
      />
    </FloatingLabel>
  )
}
FloatingField.defaultProps = {
  type: 'text',
  label: 'Please set label',
  className: 'mb-3',
  required: false,
  isInvalid: false,
}

export default FloatingField
