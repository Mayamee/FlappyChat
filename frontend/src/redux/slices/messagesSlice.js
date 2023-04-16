const { createSlice, createEntityAdapter } = require('@reduxjs/toolkit')

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

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
  (state) => state.messages
)

export default messagesSlice.reducer
