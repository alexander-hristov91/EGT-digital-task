import { configureStore } from '@reduxjs/toolkit'

import { postsReducer } from '../Users/pages/Posts/postsSlice'
import { usersReducer } from '../Users/pages/UserList/userSlice'


export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
})

// Infer all types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store  