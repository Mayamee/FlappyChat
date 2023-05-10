import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useBreakPoint } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/vars'

const LanguageButton = () => {
  const { i18n } = useTranslation()
  const changeLanguage = (lng) => () => {
    i18n.changeLanguage(lng)
  }
  const isSmallScreen = useBreakPoint(BREAKPOINTS.sm)
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="change-language-menu">
        {i18n.language.toUpperCase()}
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{
          minWidth: '5rem',
          marginLeft: isSmallScreen ? '-1rem' : null,
        }}
      >
        {Object.keys(i18n.store.data).map((lng) => (
          <Dropdown.Item key={lng} onClick={changeLanguage(lng)}>
            {lng.toUpperCase()}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LanguageButton
