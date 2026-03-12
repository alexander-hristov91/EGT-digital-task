import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import type { AppDispatch } from "../../../../shared/store";
import { deletePostFromList } from "../postsSlice";
import { postsApi } from "../postsApi";

export function usePostDelete(postId: number) {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePost = useCallback(async () => {
    setIsDeleting(true);
    try {
      await postsApi.delete(postId);

      dispatch(deletePostFromList({ postId }));
      message.success("Post deleted successfully");
      return true;
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to delete post",
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [dispatch, postId]);

  return { deletePost, isDeleting };
}
