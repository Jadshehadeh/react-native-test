import { createSlice } from "@reduxjs/toolkit"

interface IType {
      articles: []
}

const initialState: IType = {
      articles: []
}

export const articlesSlice = createSlice({
      name: 'ArticlesSlice',
      initialState,
      reducers: {
            setArticles: (state: any, action) => {
                  state.articles = action.payload
            },
      }
})
export const { setArticles } = articlesSlice.actions
export default articlesSlice.reducer