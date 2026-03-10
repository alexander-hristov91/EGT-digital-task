import { ALL_USERS } from "../../shared/constants";
import { type User, type UsersState } from "./../../shared/types";
import { createSlice, type Dispatch } from "@reduxjs/toolkit";

const initialState: UsersState = {
  userItems: [],
  hashmap: {},
  loading: false,
  error: null,
  hasFetched: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersInit(state) {
      state.loading = true;
      state.error = null;
      state.hasFetched = false;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.hasFetched = true;
      state.userItems = action.payload;
      state.hashmap = action.payload.reduce(
        (acc: Record<number, User>, user: User) => {
          acc[user.id] = user;
          return acc;
        },
        {},
      );
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUsersState() {
      return initialState;
    },
  },
});

export const {
  fetchUsersInit,
  fetchUsersSuccess,
  fetchUsersFailure,
  resetUsersState,
} = usersSlice.actions;

export const { reducer: usersReducer } = usersSlice;

export default usersSlice.reducer;

export const selectUsers = (state: { users: UsersState }) => state.users;

export const fetchUsers = () => async (dispatch: Dispatch) => {
  dispatch(fetchUsersInit());
  try {
    const response = await fetch(ALL_USERS);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    dispatch(
      fetchUsersFailure(
        error instanceof Error ? error.message : "Failed to fetch users",
      ),
    );
  }
};
