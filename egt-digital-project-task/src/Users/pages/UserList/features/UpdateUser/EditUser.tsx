import { Button, Space } from "antd";
import type { User } from "../../../../shared/types";
import { useUserEdit } from "./useEditUser";

interface EditUserProps {
  user: User;
  editedUser: User;
  setEditedUser: (user: User) => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  hasChanged: boolean;
}

export function EditUser({
  user,
  editedUser,
  setEditedUser,
  isEdit,
  setIsEdit,
  hasChanged,
}: EditUserProps) {
  const { updateUser, isUpdating } = useUserEdit({
    editedUser,
    onSuccessCallback: (updatedUser) => {
      setIsEdit(false);

      setEditedUser(updatedUser);
    },
  });

  const handleSave = () => {
    updateUser();
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEdit(false);
  };

  const handleEdit = () => setIsEdit(true);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Space>
        {isEdit ? (
          <>
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              loading={isUpdating}
              disabled={!hasChanged}
            >
              Save
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            Edit
          </Button>
        )}
      </Space>
    </div>
  );
}
