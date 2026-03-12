import type { Post } from "../types";
import { usePostUpdate } from "./usePostUpdate";
import { usePostDelete } from "./usePostDelete";

interface UsePostActionsProps {
  post: Post;
  editedTitle: string;
  editedBody: string;
  setEditedTitle: (title: string) => void;
  setEditedBody: (body: string) => void;
  stopEditing: () => void;
}

interface UsePostActionsReturn {
  isUpdating: boolean;
  isDeleting: boolean;
  handleSaveClick: () => Promise<void>;
  handleDeleteConfirm: () => Promise<boolean>;
}

export function usePostActions({
  post,
  editedTitle,
  editedBody,
  setEditedTitle,
  setEditedBody,
  stopEditing,
}: UsePostActionsProps): UsePostActionsReturn {
  const { updatePost, isUpdating } = usePostUpdate({
    post,
    editedTitle,
    editedBody,
    setEditedTitle,
    setEditedBody,
    stopEditing,
  });
  const { deletePost, isDeleting } = usePostDelete(post.id);

  const handleSaveClick = async () => {
    await updatePost();
  };

  return {
    isUpdating,
    isDeleting,
    handleSaveClick,
    handleDeleteConfirm: deletePost,
  };
}
