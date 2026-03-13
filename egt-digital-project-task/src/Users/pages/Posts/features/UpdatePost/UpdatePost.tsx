import { Button } from "antd";

interface EditPostProps {
  isEditing: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function UpdatePost({
  isEditing,
  isUpdating,
  isDeleting,
  onEdit,
  onSave,
  onCancel,
}: EditPostProps) {
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
        <Button onClick={onCancel} disabled={isUpdating || isDeleting}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button type="primary" onClick={onEdit} disabled={isUpdating || isDeleting}>
      Edit
    </Button>
  );
}
