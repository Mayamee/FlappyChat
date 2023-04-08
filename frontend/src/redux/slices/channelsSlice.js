import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    entities: {},
    ids: [],
    activeChannel: 1,
  },
  reducers: {
    setChannels: (state, { payload }) => {
      const newState = state
      const { entities, ids } = payload
      newState.entities = entities
      newState.ids = ids
    },
    addChannel: (state, { payload }) => {},
    deleteChannel: (state, { payload }) => {},
    renameChannel: (state, { payload }) => {},
    setActiveChannel: (state, { payload }) => {
      const newState = state
      newState.activeChannel = payload
    },
  },
})

export const { setChannels, setActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer
