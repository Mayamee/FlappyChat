import selectActiveChannel from '../selectors/selectActiveChannel'

const { createSlice, createEntityAdapter, createSelector } = require('@reduxjs/toolkit')

const messagesAdapter = createEntityAdapter()
const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setMessages: messagesAdapter.setAll,
  },
})

export const { addMessage, setMessages } = messagesSlice.actions

export const { selectAll: selectAllMessages, selectTotal: selectTotalMessages } =
  messagesAdapter.getSelectors((state) => state.messages)

export const selectMessagesByChannelId = createSelector(
  [selectAllMessages, selectActiveChannel],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId)
)

export default messagesSlice.reducer
