import { Button, Collapse, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ActionsConfig, User } from "../../../shared/types";
import { EditUser } from "../features/UpdateUser/EditUser";
import { useUserEdit } from "../features/UpdateUser/useEditUser";

import { hasUserChanges } from "../utils/compareUsers";
import { validateUserFields } from "../utils/userFields";
import { UserForm } from "./UserForm";

interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const errors = validateUserFields(editedUser);
  const hasChanged = hasUserChanges(user, editedUser);
  const hasErrors = Object.keys(errors).length > 0;

  const { updateUser, isUpdating } = useUserEdit({
    editedUser,
    onSuccessCallback: () => {
      setIsEdit(false);
    },
  });

  const config: ActionsConfig<User> = {
    isEdit,
    onChange: setEditedUser,
  };

  const handlers = {
    onEdit: () => setIsEdit(true),
    onSave: () => {
      const validationErrors = validateUserFields(editedUser);
      if (Object.keys(validationErrors).length === 0) {
        updateUser();
      }
    },
    onCancel: () => {
      setEditedUser(user);
      setIsEdit(false);
    },
  };

  const items = [
    {
      key: "details",
      label: (
        <span style={{ fontSize: 16, fontWeight: 600, color: "blue" }}>
          {user.name}
        </span>
      ),
      children: <UserForm user={editedUser} config={config} errors={errors} />,
      extra: (
        <Space>
          <EditUser
            isEdit={isEdit}
            hasChanged={hasChanged}
            hasErrors={hasErrors}
            isLoading={isUpdating}
            handlers={handlers}
          />
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${user.id}`);
            }}
          >
            See Posts
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: 1230, marginBottom: 20 }}>
      <Collapse items={items} />
    </div>
  );
}
