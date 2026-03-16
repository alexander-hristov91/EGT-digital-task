import { Button } from "antd";
import type { Post } from "../../types";
import { usePostEdit } from "./usePostUpdate";

interface EditStateProps {
  isEditing: boolean;
  editedPost: Post;
  setEditedPost: (post: Post) => void;
  stopEditing: () => void;
  startEditing: () => void;
}

interface EditPostProps {
  post: Post;
  editState: EditStateProps;
}

export function EditPost({ post, editState }: EditPostProps) {
  const { editedPost, setEditedPost, stopEditing, isEditing } = editState;

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
