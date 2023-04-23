import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';
import authSlice from './slices/authSlice';
import messagesReducer from './slices/messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    auth: authSlice,
  },
});
