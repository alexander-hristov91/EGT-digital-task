import { Button, Popconfirm } from "antd";

interface PostActionsProps {
  isEditing: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function PostActions({
  isEditing,
  isUpdating,
  isDeleting,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: PostActionsProps) {
  if (isEditing) {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          type="primary"
          onClick={onSave}
          loading={isUpdating}
          disabled={isDeleting}
        >
          Save
        </Button>
        <Button onClick={onCancel} disabled={isUpdating}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button type="primary" onClick={onEdit} disabled={isUpdating}>
        Edit
      </Button>
      <Popconfirm
        title="Delete Post"
        description="Are you sure you want to delete this post?"
        onConfirm={onDelete}
        okText="Yes"
        cancelText="No"
        disabled={isUpdating}
      >
        <Button danger loading={isDeleting} disabled={isUpdating}>
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
}
