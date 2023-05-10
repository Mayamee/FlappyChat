import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './slices/channelsSlice'
import authReducer from './slices/authSlice'
import messagesReducer from './slices/messagesSlice'
import menuReducer from './slices/menuSlice'

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    auth: authReducer,
    menu: menuReducer,
  },
})
