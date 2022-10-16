import { createSlice } from "@reduxjs/toolkit"

interface IType {
      isLoggedIn: boolean
      token: string
}

const initialState: IType = {
      isLoggedIn: false,
      token: "",
}

export const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
            setLogin: (state, action) => {
                  state.token = action.payload.token
                  state.isLoggedIn = action.payload.isLoggedIn
            },
            setLogout: (state) => {
                  state.token = "",
                  state.isLoggedIn = false
            }
      }
})
export const { setLogin, setLogout } = authSlice.actions
export default authSlice.reducer