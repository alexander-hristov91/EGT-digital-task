import { Collapse, Space } from "antd";
import { useState } from "react";
import { EditPost } from "../features/UpdatePost/EditPost";
import { usePostEdit } from "../features/UpdatePost/usePostEdit";
import { DeletePost } from "../features/DeletePost/DeletePost";
import type {  Post } from "../types";
import { hasPostChanges } from "../utils/comparePosts";
import { PostForm } from "./PostForm";
import { validatePostFields } from "../utils/validatePostFields";
import type { ActionsConfig } from "../../../shared/types";

interface SinglePostProps {
  post: Post;
}

export default function SinglePost({ post }: SinglePostProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedPost, setEditedPost] = useState<Post>(post);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const hasChanged = hasPostChanges(post, editedPost);

  const { updatePost, isUpdating } = usePostEdit({
    editedPost,
    onSuccessCallback: () => {
      setIsEdit(false);
    },
  });

  const config: ActionsConfig<Post> = {
    isEdit,
    onChange: setEditedPost,
    errors: validationErrors,
  };

  const handlers = {
    onEdit: () => {
      setIsEdit(true);
    },
    onSave: () => {
      const errors = validatePostFields(editedPost);
      setValidationErrors(errors);
      if (!Object.keys(errors).length) {
        updatePost();
      }
    },
    onCancel: () => {
      setEditedPost(post);
      setIsEdit(false);
      setValidationErrors({});
    },
  };

  const items = [
    {
      key: "details",
      label: (
        <span style={{ fontSize: 16, fontWeight: 600 }}>
          Post ID: {post.id}
        </span>
      ),
      children: <PostForm post={editedPost} config={config} />,
      extra: (
        <Space>
          <EditPost
            isEdit={isEdit}
            hasChanged={hasChanged}
            isLoading={isUpdating}
            handlers={handlers}
          />
          <DeletePost postId={post.id} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: 1230, marginBottom: 20 }}>
      <Collapse items={items} />
    </div>
  );
}
