import { Collapse, Form, Space } from "antd";
import { useState } from "react";
import { DeletePost } from "../features/DeletePost/DeletePost";
import { EditPost } from "../features/UpdatePost/EditPost";
import { usePostEdit } from "../features/UpdatePost/usePostEdit";
import type { Post } from "../types";
import { hasPostChanges } from "../utils/comparePosts";
import { PostForm } from "./PostForm";

interface SinglePostProps {
  post: Post;
}

export default function SinglePost({ post }: SinglePostProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm<Post>();

  const formValues = Form.useWatch([], form);
  const hasChanged = hasPostChanges(post, formValues || post);

  const { updatePost, isUpdating } = usePostEdit();

  const handlers = {
    onEdit: () => {
      setIsEdit(true);
    },
    onSave: () => {
      form.submit();
    },
    onCancel: () => {
      form.resetFields();
      setIsEdit(false);
    },
  };

  const onFinish = (values: Post) => {
    updatePost(values);
  };

  const items = [
    {
      key: "details",
      label: (
        <span style={{ fontSize: 16, fontWeight: 600 }}>
          Post ID: {post.id}
        </span>
      ),
      children: (
        <Form
          form={form}
          initialValues={post}
          onFinish={onFinish}
          layout="vertical"
        >
          <PostForm isEdit={isEdit} />
        </Form>
      ),
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
