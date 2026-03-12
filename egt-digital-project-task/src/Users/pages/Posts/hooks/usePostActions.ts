import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import type { Post } from "../types";
import type { AppDispatch } from "../../../../shared/store";
import { updatePostInList, deletePostFromList } from "../postsSlice";
import { SINGLE_POST } from "../constants";

interface UsePostActionsProps {
  post: Post;
  editedTitle: string;
  editedBody: string;
  setEditedTitle: (title: string) => void;
  setEditedBody: (body: string) => void;
  stopEditing: () => void;
}

export function usePostActions({
  post,
  editedTitle,
  editedBody,
  setEditedTitle,
  setEditedBody,
  stopEditing,
}: UsePostActionsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveClick = useCallback(async () => {
    if (!editedTitle.trim() || !editedBody.trim()) {
      message.error("Title and body cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(SINGLE_POST(post.id), {
        method: "PUT",
        body: JSON.stringify({
          id: post.id,
          title: editedTitle,
          body: editedBody,
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
      dispatch(updatePostInList({ post: updatedPost }));
      message.success("Post updated successfully");

      setEditedTitle(updatedPost.title);
      setEditedBody(updatedPost.body);
      stopEditing();
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to update post",
      );
    } finally {
      setIsUpdating(false);
    }
  }, [
    dispatch,
    post,
    editedTitle,
    editedBody,
    setEditedTitle,
    setEditedBody,
    stopEditing,
  ]);

  const handleDeleteConfirm = useCallback(async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(SINGLE_POST(post.id), { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.status}`);
      }

      dispatch(deletePostFromList({ postId: post.id }));
      message.success("Post deleted successfully");
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to delete post",
      );
    } finally {
      setIsDeleting(false);
    }
  }, [dispatch, post.id]);

  return {
    isUpdating,
    isDeleting,
    handleSaveClick,
    handleDeleteConfirm,
  };
}
