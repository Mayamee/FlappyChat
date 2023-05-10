const { NODE_ENV } = process.env
const { _ENV_ } = window

// STATIC VARS
const API_PATH = '/api/v1'
export const MESSAGE_LIMIT = 1024
export const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}
// STATIC VARS
let PUBLIC_URL = ''
let accessToken = ''

if (NODE_ENV === 'development') {
  PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL
  accessToken = process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN
}

if (NODE_ENV === 'production') {
  try {
    PUBLIC_URL = _ENV_.PUBLIC_URL
    accessToken = _ENV_.ROLLBAR_ACCESS_TOKEN
  } catch (e) {
    console.error('Error setting up runtime environment', e)
  }
}

export const API_CONFIG = {
  API_PATH,
  PUBLIC_URL,
}

export const ROLLBAR_CONFIG = {
  accessToken,
  environment: NODE_ENV,
}
