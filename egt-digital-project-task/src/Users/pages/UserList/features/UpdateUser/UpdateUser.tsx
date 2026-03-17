import { Button } from "antd";
import type { EditStateProps } from "../../types";
import { useUserEdit } from "./useUpdateUser";

interface EditUserProps {
  editState: EditStateProps;
}

export function EditUser({ editState }: EditUserProps) {
  const { editedUser, stopEditing, hasChanges } = editState;

  const { updateUser, isUpdating } = useUserEdit({
    editedUser,
    stopEditing,
  });

  if (!hasChanges) {
    return null;
  }

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <Button type="primary" onClick={updateUser} loading={isUpdating}>
        Save
      </Button>
      <Button onClick={() => stopEditing()} disabled={isUpdating}>
        Cancel
      </Button>
    </div>
  );
}