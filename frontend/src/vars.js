const { NODE_ENV } = process.env
const { _ENV_ } = window
const API_PATH = '/api/v1'

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
