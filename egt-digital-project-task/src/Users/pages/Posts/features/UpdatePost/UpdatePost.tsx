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
  const { editedPost, setEditedPost, stopEditing } = editState;

  const { updatePost, isUpdating } = usePostEdit({
    originalPost: post,
    editedPost,
    setEditedPost,
    stopEditing,
  });

  // const handleSaveClick = async () => {
  //   await updatePost();
  // };

  // const handleCancelClick = () => {
  //   stopEditing();
  // };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button type="primary" onClick={updatePost} loading={isUpdating}>
        Save
      </Button>
      <Button onClick={stopEditing} disabled={isUpdating}>
        Cancel
      </Button>
    </div>
  );
}
