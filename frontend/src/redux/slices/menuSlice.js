import { createSlice } from '@reduxjs/toolkit'
import { logout } from './authSlice'

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openMenu: (state) => {
      const newState = state
      newState.isOpen = true
    },
    closeMenu: (state) => {
      const newState = state
      newState.isOpen = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      const newState = state
      newState.isOpen = false
    })
  },
})

export const { closeMenu, openMenu } = menuSlice.actions
export default menuSlice.reducer
