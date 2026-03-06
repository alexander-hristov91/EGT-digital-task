import { configureStore } from '@reduxjs/toolkit'
import reducer from '../features/users/userSlice'


export const store = configureStore({
  reducer: {
    users: reducer,
  },
})

// Infer all types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store  