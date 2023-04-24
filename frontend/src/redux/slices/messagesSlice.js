import selectActiveChannel from '../selectors/selectActiveChannel'
import { removeChannel } from './channelsSlice'

const { createSlice, createEntityAdapter, createSelector } = require('@reduxjs/toolkit')

const messagesAdapter = createEntityAdapter()
const initialState = messagesAdapter.getInitialState()

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
  (state) => state.messages
)

export const selectMessagesByChannelId = createSelector(
  [selectAllMessages, selectActiveChannel],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId)
)

export const selectTotalMessagesByChannelId = createSelector(
  [selectMessagesByChannelId],
  (messages) => messages.length
)
const { selectAll: selectMessagesInternally } = messagesAdapter.getSelectors()
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setMessages: messagesAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload: channelId }) => {
      const messages = selectMessagesInternally(state)
      const messagesToDelete = messages.filter((message) => message.channelId === channelId)
      messagesAdapter.removeMany(
        state,
        messagesToDelete.map((message) => message.id)
      )
    })
  },
})

export const { addMessage, setMessages } = messagesSlice.actions

export default messagesSlice.reducer
