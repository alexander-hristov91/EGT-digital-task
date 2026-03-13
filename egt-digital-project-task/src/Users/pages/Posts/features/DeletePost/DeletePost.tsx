import { Button, Popconfirm } from "antd";

interface DeletePostProps {
  onDelete: () => Promise<boolean>;
  isDeleting: boolean;
  isUpdating: boolean;
}

export function DeletePost({
  onDelete,
  isDeleting,
  isUpdating,
}: DeletePostProps) {
  return (
    <Popconfirm
      title="Delete Post"
      description="Are you sure you want to delete this post?"
      onConfirm={onDelete}
      okText="Yes"
      cancelText="No"
      disabled={isUpdating}
    >
      <Button
        danger
        loading={isDeleting}
        disabled={isUpdating}
      >
        Delete
      </Button>
    </Popconfirm>
  );
}