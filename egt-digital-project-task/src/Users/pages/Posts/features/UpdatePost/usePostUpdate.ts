import { useState, useCallback } from "react";
import { message } from "antd";
import type { Post } from "../../types";
import { SINGLE_POST } from "../../constants";
import { updatePostInList } from "../../postsSlice";
import { useAppDispatch } from "../../../../../shared/hooks";

interface UsePostEditProps {
  editedPost: Post;
  stopEditing: () => void;
}

export function usePostEdit({ editedPost, stopEditing }: UsePostEditProps) {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const updatePost = useCallback(async () => {
    if (!editedPost.title.trim() || !editedPost.body.trim()) {
      message.error("Title and body cannot be empty");
      return false;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(SINGLE_POST(editedPost.id), {
        method: "PUT",
        body: JSON.stringify({
          id: editedPost.id,
          title: editedPost.title,
          body: editedPost.body,
          userId: editedPost.userId,
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

      stopEditing();
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to update post",
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [dispatch, editedPost, stopEditing]);

  return { updatePost, isUpdating };
}
