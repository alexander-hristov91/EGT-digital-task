import { Button, Space } from "antd";

interface EditUserHandlers {
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

interface EditUserProps {
  isEdit: boolean;
  hasChanged: boolean;
  hasErrors?: boolean;
  isLoading: boolean;
  handlers: EditUserHandlers;
}

export function EditUser({
  isEdit,
  hasChanged,
  hasErrors = false,
  isLoading = false,
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
