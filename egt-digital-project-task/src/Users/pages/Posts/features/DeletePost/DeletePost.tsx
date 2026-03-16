import { Button, Popconfirm } from "antd";
import { usePostDelete } from "./usePostDelete";

interface DeletePostProps {
  postId: number;
}

export function DeletePost({ postId }: DeletePostProps) {
  const { deletePost, loading } = usePostDelete(postId);

  return (
    <Popconfirm
      title="Delete Post"
      description="Are you sure you want to delete this post?"
      onConfirm={deletePost}
      okText="Yes"
      cancelText="No"
    >
      <Button danger loading={loading} >
        Delete
      </Button>
    </Popconfirm>
  );
}
