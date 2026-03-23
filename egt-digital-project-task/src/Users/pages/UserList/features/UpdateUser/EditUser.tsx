import { Button, Space } from "antd";

interface EditUserHandlers {
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

interface EditUserProps {
  isEdit: boolean;
  hasChanged: boolean;
  isLoading: boolean;
  handlers: EditUserHandlers;
}

export function EditUser({
  isEdit,
  hasChanged,
  isLoading,
  handlers,
}: EditUserProps) {
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