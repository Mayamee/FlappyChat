import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()
const initialState = channelsAdapter.getInitialState({
  activeChannel: 0,
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    setActiveChannel: (state, { payload: activeChannel }) => {
      const newState = state
      newState.activeChannel = activeChannel
    },
  },
})

export const { selectAll: selectAllChannels } = channelsAdapter.getSelectors(
  (state) => state.channels
)

export const { setChannels, setActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer
