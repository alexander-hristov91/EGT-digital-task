import { useState, useCallback } from "react";
import { message } from "antd";
import { SINGLE_POST } from "../../constants";
import { deletePostFromList } from "../../postsSlice";
import { useAppDispatch } from "../../../../../shared/hooks";

export function usePostDelete(postId: number) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const deletePost = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(SINGLE_POST(postId), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.status}`);
      }

      dispatch(deletePostFromList({ postId }));
      message.success("Post deleted successfully");
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to delete post",
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [dispatch, postId]);

  return { deletePost, loading };
}
