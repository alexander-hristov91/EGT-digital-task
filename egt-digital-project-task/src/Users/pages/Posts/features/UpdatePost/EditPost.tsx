import { Button, Space } from "antd";

interface EditPostHandlers {
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

interface EditPostProps {
  isEdit: boolean;
  hasChanged: boolean;
  hasErrors?: boolean;
  isLoading: boolean;
  handlers: EditPostHandlers;
}

export function EditPost({
  isEdit,
  hasChanged,
  hasErrors = false,
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
          disabled={!hasChanged || hasErrors}
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
