import { createSlice } from "@reduxjs/toolkit"

interface IType {
      filter: string
}
    
const initialState: IType = {
      filter: ""
}

export const filterSlice = createSlice({
      name: 'ArticleFilter',
      initialState,
      reducers: {
            setFilter: (state, action) => {
                  state.filter = action.payload
            },
            clearFilter: (state) => {
                  state.filter = ""
            }
      }
})
export const { setFilter , clearFilter} = filterSlice.actions
export default filterSlice.reducer