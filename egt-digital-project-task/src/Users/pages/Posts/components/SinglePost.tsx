import { Button, Card, Input, message, Popconfirm, Typography } from "antd";
import type { Post } from "../types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../shared/store";
import { useState } from "react";
import { deletePost, updatePost } from "../postsSlice";


const { Paragraph, Title } = Typography;
const { TextArea } = Input;

interface SinglePostProps {
  post: Post;
}

export default function SinglePost({ post }: SinglePostProps) {
  const dispatch = useDispatch<AppDispatch>(); 

  const updatingPostId = useSelector(
    (state: RootState) => state.posts.updatingPostId
  );
  const deletingPostId = useSelector(
    (state: RootState) => state.posts.deletingPostId
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const isUpdating = updatingPostId === post.id;
  const isDeleting = deletingPostId === post.id;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(post.title);
    setEditedBody(post.body);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(post.title);
    setEditedBody(post.body);
  };

  const handleSaveClick = () => {
    if (!editedTitle.trim() || !editedBody.trim()) {
      message.error("Title and body cannot be empty");
      return;
    }

    dispatch(
      updatePost({
        id: post.id,
        title: editedTitle,
        body: editedBody,
        userId: post.userId,
      })
    );
   
    message.success("Post updated successfully");
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deletePost(post.id));
    message.success("Post deleted successfully");
  };

  return (
    <Card
      title={<Title level={5}>{post.title}</Title>}
      style={{ width: 1230, marginBottom: 20 }}
      extra={
        <div style={{ display: "flex", gap: 8 }}>
          {!isEditing ? (
            <>
              <Button
                type="primary"
                onClick={handleEditClick}
                disabled={isUpdating || isDeleting}
              >
                Edit
              </Button>
              <Popconfirm
                title="Delete Post"
                description="Are you sure you want to delete this post?"
                onConfirm={handleDeleteConfirm}
                okText="Yes"
                cancelText="No"
                disabled={isUpdating || isDeleting}
              >
                <Button
                  danger
                  loading={isDeleting}
                  disabled={isUpdating || isDeleting}
                >
                  Delete
                </Button>
              </Popconfirm>
            </>
          ) : (
            <>
              <Button
                type="primary"
                onClick={handleSaveClick}
                loading={isUpdating}
                disabled={isDeleting}
              >
                Save
              </Button>
              <Button onClick={handleCancelClick} disabled={isUpdating || isDeleting}>
                Cancel
              </Button>
            </>
          )}
        </div>
      }
    >
      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <strong>Title:</strong>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={{ marginTop: 8, width: "100%" }}
              disabled={isUpdating}
            />
          </div>
          <div>
            <strong>Body:</strong>
            <TextArea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              style={{ marginTop: 8, width: "100%" }}
              rows={4}
              disabled={isUpdating}
            />
          </div>
        </div>
      ) : (
        <>
          <Paragraph>
            <strong>ID:</strong> {post.id}
          </Paragraph>
          <Paragraph>
            <strong>Body:</strong> {post.body}
          </Paragraph>
          <Paragraph>
            <strong>User ID:</strong> {post.userId}
          </Paragraph>
        </>
      )}
    </Card>
  );
}