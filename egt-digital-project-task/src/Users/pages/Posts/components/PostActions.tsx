import { Button } from "antd";
import { DeletePost } from "../features/DeletePost/DeletePost";
import type { Post } from "../types";
import { EditPost } from "../features/UpdatePost/UpdatePost";

interface EditStateProps {
  isEditing: boolean;
  editedPost: Post;
  setEditedPost: (post: Post) => void;
  stopEditing: () => void;
  startEditing: () => void;
}

interface PostActionsProps {
  post: Post;
  editState: EditStateProps;
}

export default function PostActions({ post, editState }: PostActionsProps) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {editState.isEditing ? (
        <EditPost post={post} editState={editState} />
      ) : (
        <>
          <DeletePost postId={post.id} />
          <Button type="primary" onClick={editState.startEditing}>
            Edit
          </Button>
        </>
      )}
    </div>
  );
}
