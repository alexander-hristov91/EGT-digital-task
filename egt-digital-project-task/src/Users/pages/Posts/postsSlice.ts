import { createSlice } from "@reduxjs/toolkit";
import type { Post, PostsState } from "./types";
import { USER_POSTS } from "./constants";
import type { AppDispatch, RootState } from "../../../shared/store";

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
    fetchPostsSuccess(state, action: { payload: Post[] }) {
      state.loading = false;
      state.hasFetched = true;
      state.postsItems = action.payload;
    },
    fetchPostsFailure(state, action: { payload: string }) {
      state.loading = false;
      state.error = action.payload;
    },

    updatePostInList(state, action: { payload: { post: Post } }) {
      const index = state.postsItems.findIndex(
        (p) => p.id === action.payload.post.id,
      );
      if (index !== -1) {
        state.postsItems[index] = action.payload.post;
      }
    },
    deletePostFromList(state, action: { payload: { postId: number } }) {
      state.postsItems = state.postsItems.filter(
        (p) => p.id !== action.payload.postId,
      );
    },

    resetPostsState() {
      return initialState;
    },
  },
});

export const { resetPostsState, updatePostInList, deletePostFromList } =
  postsSlice.actions;

export const { fetchPostsInit, fetchPostsSuccess, fetchPostsFailure } =
  postsSlice.actions;

export const { reducer: postsReducer } = postsSlice;

export const selectPosts = (state: RootState) => state.posts;

export const fetchPostsByUserId =
  (userId: number) => async (dispatch: AppDispatch) => {
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
