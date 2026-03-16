import { Button } from "antd";
import type { EditStateProps, Post } from "../../types";
import { usePostEdit } from "./usePostUpdate";

interface EditPostProps {
  post: Post;
  editState: EditStateProps;
}

export function EditPost({ post, editState }: EditPostProps) {
  const { editedPost, stopEditing } = editState;

  const { updatePost, isUpdating } = usePostEdit({
    originalPost: post,
    editedPost,
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
      <Button onClick={() => stopEditing()} disabled={isUpdating}>
        Cancel
      </Button>
    </div>
  );
}
