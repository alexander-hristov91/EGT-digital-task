import { useState, useCallback } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const resetEditedValues = useCallback(() => {
    setEditedTitle(post.title);
    setEditedBody(post.body);
  }, [post.title, post.body]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    resetEditedValues();
  }, [resetEditedValues]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    resetEditedValues();
  }, [resetEditedValues]);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const { isUpdating, isDeleting, handleSaveClick, handleDeleteConfirm } =
    usePostActions({
      post,
      editedTitle,
      editedBody,
      setEditedTitle,
      setEditedBody,
      stopEditing,
    });

  return (
    <Card
      title={<Title level={5}>Post ID: {post.id}</Title>}
      style={{ width: 1230, marginBottom: 20 }}
      extra={
        <PostActions
          isEditing={isEditing}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          onEdit={startEditing}
          onSave={handleSaveClick}
          onCancel={cancelEditing}
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
