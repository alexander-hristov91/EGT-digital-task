import { USER_POSTS } from "../../shared/constants";
import { type PostsState } from "./../../shared/types";

import { createSlice, type Dispatch } from "@reduxjs/toolkit";

const initialState: PostsState = {
  postsItems: [],
  loading: false,
  error: null,
  hasFetched: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsInit(state) {
      state.loading = true;
      state.error = null;
      state.hasFetched = false;
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.hasFetched = true;
      state.postsItems = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPostsState() {
      return initialState;
    },
  },
});

export const {
  fetchPostsInit,
  fetchPostsSuccess,
  fetchPostsFailure,
  resetPostsState,
} = postsSlice.actions;

export const { reducer: postsReducer } = postsSlice;

export default postsSlice.reducer;

export const selectPosts = (state: { posts: PostsState }) => state.posts;

export const fetchPostsByUserId =
  (userId: number) => async (dispatch: Dispatch) => {
    dispatch(fetchPostsInit());
    try {
      const response = await fetch(USER_POSTS(userId));

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      dispatch(fetchPostsSuccess(data));
    } catch (error) {
      dispatch(
        fetchPostsFailure(
          error instanceof Error ? error.message : "Failed to fetch posts",
        ),
      );
    }
  };
