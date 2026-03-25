import { message } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../../../shared/hooks";
import { SINGLE_POST_URL } from "../../constants";
import { updatePostInList } from "../../postsSlice";
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

  const updatePost = async (values?: Post) => {
    setIsUpdating(true);
    const postData = values || editedPost;

    try {
      const response = await fetch(SINGLE_POST_URL(postData.id), {
        method: "PUT",
        body: JSON.stringify({
          id: postData.id,
          title: postData.title,
          body: postData.body,
          userId: postData.userId,
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
  };

  return { updatePost, isUpdating };
}
