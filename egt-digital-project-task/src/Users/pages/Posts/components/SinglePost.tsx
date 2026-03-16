import { useState } from "react";
import { Card, Typography } from "antd";
import type { Post } from "../types";
import PostActions from "./PostActions";
import PostViewMode from "./PostViewMode";
import PostEditMode from "./PostEditMode";

const { Title } = Typography;

interface SinglePostProps {
  post: Post;
}

export default function SinglePost({ post }: SinglePostProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedPost, setEditedPost] = useState<Post>(post);

  const startEditing = () => {
    setIsEditing(true);
    setEditedPost(post);
  };
//todo
  const stopEditing = (saveChanges: boolean = false) => {
    if (!saveChanges) {
      setEditedPost(post);
    }
    setIsEditing(false);
  };

  const editState = {
    isEditing,
    editedPost,
    setEditedPost,
    stopEditing,
    startEditing,
  };

  return (
    <Card
      title={<Title level={5}>Post ID: {post.id}</Title>}
      style={{ maxWidth: 1230, marginBottom: 20 }}
      extra={<PostActions post={post} editState={editState} />}
    >
      {isEditing ? (
        <PostEditMode
          post={editedPost}
          setEditedPost={setEditedPost}
        />
      ) : (
        <PostViewMode post={post} />
      )}
    </Card>
  );
}
