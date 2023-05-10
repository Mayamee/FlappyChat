import { useMediaQuery } from 'usehooks-ts'

export const useBreakPoint = (breakpoint) => useMediaQuery(`(max-width: ${breakpoint}px)`)
