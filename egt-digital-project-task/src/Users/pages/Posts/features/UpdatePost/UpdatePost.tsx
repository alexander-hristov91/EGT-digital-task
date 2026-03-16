import { Button } from "antd";
import type { Post } from "../../types";
import { usePostEdit } from "./usePostUpdate";

interface EditPostProps {
  post: Post;
  editedPost: Post;
  setEditedPost: (post: Post) => void;
  isEditing: boolean;
  stopEditing: () => void;
}

export function EditPost({
  post,
  editedPost,
  setEditedPost,
  isEditing,
  stopEditing,
}: EditPostProps) {
  const { updatePost, isUpdating } = usePostEdit({
    originalPost: post,
    editedPost,
    setEditedPost,
    stopEditing,
  });

  const handleSaveClick = async () => {
    await updatePost();
  };

  const handleCancelClick = () => {
    stopEditing();
  };

  if (isEditing) {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        <Button type="primary" onClick={handleSaveClick} loading={isUpdating}>
          Save
        </Button>
        <Button onClick={handleCancelClick} disabled={isUpdating}>
          Cancel
        </Button>
      </div>
    );
  }

  return null;
}
