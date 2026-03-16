import { Button, Popconfirm } from "antd";
import { usePostDelete } from "./usePostDelete";

interface DeletePostProps {
  postId: number;
}

export function DeletePost({ postId }: DeletePostProps) {
  const { deletePost, isDeleting } = usePostDelete(postId);

  return (
    <Popconfirm
      title="Delete Post"
      description="Are you sure you want to delete this post?"
      onConfirm={deletePost}
      okText="Yes"
      cancelText="No"
    >
      <Button danger loading={isDeleting} disabled={isDeleting}>
        Delete
      </Button>
    </Popconfirm>
  );
}
