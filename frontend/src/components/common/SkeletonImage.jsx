import { useState } from 'react'

const SkeletonImage = ({ children, spinner }) => {
  const [isLoading, setIsLoading] = useState(true)
  const handleLoad = () => {
    setIsLoading(false)
  }
  return (
    <>
      {isLoading && spinner}
      {children(handleLoad, isLoading)}
    </>
  )
}

export default SkeletonImage
