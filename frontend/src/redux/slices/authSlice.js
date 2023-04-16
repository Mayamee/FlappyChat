const { createSlice } = require('@reduxjs/toolkit')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLogin: false,
  },
  reducers: {
    login: (state, { payload: userData }) => {
      const storeState = state
      storeState.isLogin = true
      storeState.user = userData
    },
    logout: (state) => {
      const storeState = state
      storeState.isLogin = false
      storeState.user = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
