import { configureStore } from '@reduxjs/toolkit'
import appUserSlice from './slices/appUserSlice'
import appThemeSlice from './slices/appThemeSlice'
import { baseApi } from '../src/apiServices/baseApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    appusers:appUserSlice,
    apptheme:appThemeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})
setupListeners(store.dispatch)