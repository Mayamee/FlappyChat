import { useEffect } from 'react'
import { useFormikContext } from 'formik'

const ErrorFocus = () => {
  const { errors, submitCount } = useFormikContext()
  const errorKeys = Object.keys(errors)
  const firstErrorKey = errorKeys[0]
  useEffect(() => {
    if (submitCount !== 0 && firstErrorKey) {
      const firstErrorNode = document.getElementsByName(firstErrorKey)[0]
      if (firstErrorNode) {
        firstErrorNode.focus()
      }
    }
  }, [submitCount])

  return null
}

export default ErrorFocus
