import { combineReducers, configureStore } from '@reduxjs/toolkit'
import articlesSlice from './slices/articlesSlice'
import authSlice from './slices/authSlice'
import filterSliceReducer from './slices/fliterSlice'

export const store = configureStore({
      reducer: combineReducers({
            articleFilter: filterSliceReducer,
            auth: authSlice,
            articles: articlesSlice,
      })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch