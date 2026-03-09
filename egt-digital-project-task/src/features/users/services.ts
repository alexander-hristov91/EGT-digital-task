import { createAsyncThunk } from "@reduxjs/toolkit"
import { BASE_URL } from "../../constants/constants"

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