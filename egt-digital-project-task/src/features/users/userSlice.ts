import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { BASE_URL } from '../../constants/constants'

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface UsersState {
  items: User[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  items: [],
  loading: 'idle',
  error: null,
}

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: User[] = await response.json()
      return data.slice(0, 10)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users'
      return rejectWithValue(message)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
    clearUsers: (state) => {
      state.items = []
      state.error = null
      state.loading = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = 'succeeded'
        state.items = action.payload
      })
      
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string || 'Failed to fetch users'
      })
  },
})

export const { clearUsers } = usersSlice.actions
export default usersSlice.reducer