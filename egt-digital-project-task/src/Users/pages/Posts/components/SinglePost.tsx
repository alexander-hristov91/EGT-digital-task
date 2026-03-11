import { Card, Typography } from "antd";
import type { Post } from "../types";
import { usePostActions } from "../hooks/usePostActions";
import PostActions from "./PostActions";
import PostViewMode from "./PostViewMode";
import PostEditMode from "./PostEditMode";

const { Title } = Typography;

interface SinglePostProps {
  post: Post;
}

export default function SinglePost({ post }: SinglePostProps) {
  const {
    isEditing,
    isUpdating,
    isDeleting,
    editedTitle,
    editedBody,
    setEditedTitle,
    setEditedBody,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleDeleteConfirm,
  } = usePostActions(post);

  return (
    <Card
      title={<Title level={5}>{post.title}</Title>}
      style={{ width: 1230, marginBottom: 20 }}
      extra={
        <PostActions
          isEditing={isEditing}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          onEdit={handleEditClick}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
          onDelete={handleDeleteConfirm}
        />
      }
    >
      {isEditing ? (
        <PostEditMode
          title={editedTitle}
          body={editedBody}
          onTitleChange={setEditedTitle}
          onBodyChange={setEditedBody}
          disabled={isUpdating}
        />
      ) : (
        <PostViewMode post={post} />
      )}
    </Card>
  );
}