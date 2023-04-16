import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './slices/channelsSlice'
import authSlice from './slices/authSlice'

export default configureStore({
  reducer: {
    channels: channelsReducer,
    auth: authSlice,
  },
})
