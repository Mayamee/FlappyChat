import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './slices/channelsSlice'

export default configureStore({
  reducer: {
    channels: channelsReducer,
  },
})
