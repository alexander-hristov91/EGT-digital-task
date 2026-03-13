import { useState } from "react";
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

  const resetEditedValues = () => {
    setEditedPost({
      title: post.title,
      body: post.body,
    });
  };

  const startEditing = () => {
    setIsEditing(true);
    resetEditedValues();
  };

  const cancelEditing = () => {
    setIsEditing(false);
    resetEditedValues();
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  const setEditedTitle = (title: string) => {
    setEditedPost((prev) => ({ ...prev, title }));
  };

  const setEditedBody = (body: string) => {
    setEditedPost((prev) => ({ ...prev, body }));
  };

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
