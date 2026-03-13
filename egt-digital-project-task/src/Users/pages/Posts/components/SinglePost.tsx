// components/SinglePost.tsx
import { useState, useCallback } from "react";
import { Card, Typography } from "antd";
import type { Post } from "../types";
import { usePostUpdate } from "../features/UpdatePost/usePostUpdate";
import { usePostDelete } from "../features/DeletePost/usePostDelete";
import PostActions from "./PostActions";
import PostViewMode from "./PostViewMode";
import PostEditMode from "./PostEditMode";

const { Title } = Typography;

interface SinglePostProps {
  post: Post;
}

export default function SinglePost({ post }: SinglePostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    body: post.body,
  });

  const resetEditedValues = useCallback(() => {
    setEditedPost({
      title: post.title,
      body: post.body,
    });
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

  const setEditedTitle = useCallback((title: string) => {
    setEditedPost((prev) => ({ ...prev, title }));
  }, []);

  const setEditedBody = useCallback((body: string) => {
    setEditedPost((prev) => ({ ...prev, body }));
  }, []);

  // ✅ Call hooks directly (no composition hook)
  const { updatePost, isUpdating } = usePostUpdate({
    post,
    editedTitle: editedPost.title,
    editedBody: editedPost.body,
    setEditedTitle,
    setEditedBody,
    stopEditing,
  });

  const { deletePost, isDeleting } = usePostDelete(post.id);

  const handleSaveClick = async () => {
    await updatePost();
  };

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
          onDelete={deletePost}
        />
      }
    >
      {isEditing ? (
        <PostEditMode
          title={editedPost.title}
          body={editedPost.body}
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