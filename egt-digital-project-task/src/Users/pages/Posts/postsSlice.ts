import { createSlice } from "@reduxjs/toolkit";
import type { Post, PostsState } from "./types";
import { USER_POSTS, SINGLE_POST } from "./constants";
import type { AppDispatch, RootState } from "../../../shared/store";


const initialState: PostsState = {
  postsItems: [],
  loading: false,
  error: null,
  hasFetched: false,
  updatingPostId: null,
  deletingPostId: null,
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
    updatePostInit(state, action: { payload: { postId: number } }) {
      state.updatingPostId = action.payload.postId;
      state.error = null;
    },
    updatePostSuccess(state, action: { payload: { post: Post } }) {
      state.updatingPostId = null;
      const index = state.postsItems.findIndex(
        (p) => p.id === action.payload.post.id
      );
      if (index !== -1) {
        state.postsItems[index] = action.payload.post;
      }
    },
    updatePostFailure(state, action: { payload: { postId: number; error: string } }) {
      state.updatingPostId = null;
      state.error = action.payload.error;
    },
    deletePostInit(state, action: { payload: { postId: number } }) {
      state.deletingPostId = action.payload.postId;
      state.error = null;
    },
    deletePostSuccess(state, action: { payload: { postId: number } }) {
      state.deletingPostId = null;
      state.postsItems = state.postsItems.filter(
        (p) => p.id !== action.payload.postId
      );
    },
    deletePostFailure(state, action: { payload: { postId: number; error: string } }) {
      state.deletingPostId = null;
      state.error = action.payload.error;
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
  updatePostInit,
  updatePostSuccess,
  updatePostFailure,
  deletePostInit,
  deletePostSuccess,
  deletePostFailure,
  resetPostsState,
} = postsSlice.actions;

export const { reducer: postsReducer } = postsSlice;
export default postsSlice.reducer;

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


export const updatePost =
  (post: Post) => async (dispatch: AppDispatch) => {
    dispatch(updatePostInit({ postId: post.id }));
    try {
      const response = await fetch(SINGLE_POST(post.id), {
        method: "PUT",
        body: JSON.stringify({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to update post: ${response.statusText}`);
      }

      const updatedPost = await response.json();
      dispatch(updatePostSuccess({ post: updatedPost }));
    } catch (error) {
      dispatch(
        updatePostFailure({
          postId: post.id,
          error: error instanceof Error ? error.message : "Failed to update post",
        }),
      );
    }
  };


export const deletePost =
  (postId: number) => async (dispatch: AppDispatch) => {
    dispatch(deletePostInit({ postId }));
    try {
      const response = await fetch(SINGLE_POST(postId), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.status}`);
      }

      dispatch(deletePostSuccess({ postId }));
    } catch (error) {
      dispatch(
        deletePostFailure({
          postId,
          error: error instanceof Error ? error.message : "Failed to delete post",
        }),
      );
    }
  };