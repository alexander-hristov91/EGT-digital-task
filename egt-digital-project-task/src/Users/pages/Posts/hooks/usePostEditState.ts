import { useState, useCallback } from "react";
import type { Post } from "../types";

export function usePostEditState(post: Post) {
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

  return {
    isEditing,
    editedTitle,
    editedBody,
    setEditedTitle,
    setEditedBody,
    startEditing,
    cancelEditing,
    stopEditing
  };
}