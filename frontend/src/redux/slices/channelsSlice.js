import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    entities: {},
    ids: [],
  },
  reducers: {
    setChannels: (state, { payload }) => {
      const newState = state
      const { entities, ids } = payload
      newState.entities = entities
      newState.ids = ids
    },
  },
})

export const { setChannels } = channelsSlice.actions
export default channelsSlice.reducer
