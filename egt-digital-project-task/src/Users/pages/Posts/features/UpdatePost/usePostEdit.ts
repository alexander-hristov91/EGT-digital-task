import { useState, useCallback } from "react";
import { message } from "antd";
import { useAppDispatch } from "../../../../../shared/hooks";
import { updatePostInList } from "../../postsSlice";
import { SINGLE_POST } from "../../constants";
import type { Post } from "../../types";

interface UsePostEditOptions {
  editedPost: Post;
  onSuccessCallback?: (updatedPost: Post) => void;
}

export function usePostEdit({
  editedPost,
  onSuccessCallback,
}: UsePostEditOptions) {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const updatePost = useCallback(async () => {
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

      onSuccessCallback?.(updatedPost);
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to update post",
      );
    } finally {
      setIsUpdating(false);
    }
  }, [dispatch, editedPost, onSuccessCallback]);

  return { updatePost, isUpdating };
}
