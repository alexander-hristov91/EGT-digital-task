import { Button, Space } from "antd";

interface EditPostActions {
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

interface EditPostProps {
  isEdit: boolean;
  hasChanged: boolean;
  isLoading: boolean;
  handlers: EditPostActions;
}

export function EditPost({
  isEdit,
  hasChanged,
  isLoading = false,
  handlers,
}: EditPostProps) {
  if (isEdit) {
    return (
      <Space>
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            handlers.onSave();
          }}
          loading={isLoading}
          disabled={!hasChanged}
        >
          Save
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handlers.onCancel();
          }}
        >
          Cancel
        </Button>
      </Space>
    );
  }

  return (
    <Button
      type="primary"
      onClick={(e) => {
        e.stopPropagation();
        handlers.onEdit();
      }}
    >
      Edit
    </Button>
  );
}
