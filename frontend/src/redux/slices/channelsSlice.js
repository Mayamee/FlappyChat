import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()
const initialState = channelsAdapter.getInitialState({
  activeChannel: 1,
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setDefaultActiveChannel: (state) => {
      const newState = state
      newState.activeChannel = 1
    },
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setChannels: channelsAdapter.setAll,
    setActiveChannel: (state, { payload: activeChannel }) => {
      const newState = state
      newState.activeChannel = activeChannel
    },
  },
})

// eslint-disable-next-line operator-linebreak
export const { selectAll: selectAllChannels, selectEntities: selectChannelEntities } =
  channelsAdapter.getSelectors((state) => state.channels)

export const {
  setChannels,
  setActiveChannel,
  addChannel,
  setDefaultActiveChannel,
  removeChannel,
  updateChannel,
} = channelsSlice.actions
export default channelsSlice.reducer
