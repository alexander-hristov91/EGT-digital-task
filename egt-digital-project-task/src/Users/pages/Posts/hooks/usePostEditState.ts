import { useState, useCallback } from "react";
import type { Post } from "../types";

export function usePostEditState(post: Post) {
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

  const setEditedTitle = useCallback((title: string) => {
    setEditedPost((prev) => ({ ...prev, title }));
  }, []);

  const setEditedBody = useCallback((body: string) => {
    setEditedPost((prev) => ({ ...prev, body }));
  }, []);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  return {
    isEditing,
    editedTitle: editedPost.title,
    editedBody: editedPost.body,
    setEditedTitle,
    setEditedBody,
    startEditing,
    cancelEditing,
    stopEditing,
  };
}
