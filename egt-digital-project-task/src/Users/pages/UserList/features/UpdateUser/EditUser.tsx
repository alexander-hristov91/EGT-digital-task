import { Button, Space } from "antd";
import { useEffect } from "react";
import type { User } from "../../../../shared/types";
import { hasUserChanges } from "../../utils/compareUsers";
import { useUserEdit } from "./useEditUser";

interface EditUserProps {
  user: User;
  editedUser: User;
  setEditedUser: (user: User) => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
}

export function EditUser({
  user,
  editedUser,
  setEditedUser,
  isEdit,
  setIsEdit,
}: EditUserProps) {
  useEffect(() => {
    setEditedUser(user);
  }, [user, setEditedUser]);

  const { updateUser, isUpdating } = useUserEdit({
    editedUser,
    stopEditing: () => {
      setIsEdit(false);
      setEditedUser(user);
    },
  });

  const handleSave = async () => {
    const success = await updateUser();
    if (success) setIsEdit(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEdit(false);
  };

  const handleEdit = () => setIsEdit(true);

  const hasChanged = hasUserChanges(user, editedUser);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Space>
        {isEdit ? (
          <>
            <Button
              type="primary"
              onClick={handleSave}
              loading={isUpdating}
              disabled={!hasChanged}
            >
              Save
            </Button>
            <Button onClick={handleCancel} disabled={isUpdating}>
              Cancel
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </Space>
    </div>
  );
}
