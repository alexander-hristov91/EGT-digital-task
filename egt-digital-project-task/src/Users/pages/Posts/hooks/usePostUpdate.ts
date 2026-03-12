import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import type { Post } from "../types";
import type { AppDispatch } from "../../../../shared/store";
import { updatePostInList } from "../postsSlice";
import { postsApi } from "../postsApi";

interface UsePostUpdateProps {
  post: Post;
  editedTitle: string;
  editedBody: string;
  setEditedTitle: (title: string) => void;
  setEditedBody: (body: string) => void;
  stopEditing: () => void;
}

export function usePostUpdate({
  post,
  editedTitle,
  editedBody,
  setEditedTitle,
  setEditedBody,
  stopEditing,
}: UsePostUpdateProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdating, setIsUpdating] = useState(false);

  const updatePost = useCallback(async () => {
    if (!editedTitle.trim() || !editedBody.trim()) {
      message.error("Title and body cannot be empty");
      return false;
    }

    setIsUpdating(true);
    try {
      const updatedPost = await postsApi.update({
        id: post.id,
        title: editedTitle,
        body: editedBody,
        userId: post.userId,
      });

      dispatch(updatePostInList({ post: updatedPost }));
      message.success("Post updated successfully");

      setEditedTitle(updatedPost.title);
      setEditedBody(updatedPost.body);
      stopEditing();
      return true;
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to update post",
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [
    dispatch,
    post.id,
    post.userId,
    editedTitle,
    editedBody,
    setEditedTitle,
    setEditedBody,
    stopEditing,
  ]);

  return { updatePost, isUpdating };
}
