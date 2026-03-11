import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import type { Post } from "../types";
import type { AppDispatch, RootState } from "../../../../shared/store";
import { deletePost, updatePost } from "../postsSlice";

export function usePostActions(post: Post) {
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

  return {
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
  };
}