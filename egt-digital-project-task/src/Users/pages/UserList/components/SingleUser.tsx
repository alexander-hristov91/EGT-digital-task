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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const hasChanged = hasUserChanges(user, editedUser);

  const { updateUser, isUpdating } = useUserEdit({
    editedUser,
    onSuccessCallback: () => {
      setIsEdit(false);
      setValidationErrors({});
    },
  });

  const config: ActionsConfig<User> = {
    isEdit,
    onChange: setEditedUser,
    errors: validationErrors,
  };

  const handlers = {
    onEdit: () => {
      setIsEdit(true);
      setValidationErrors({});
    },
    onSave: () => {
      const errors = validateUserFields(editedUser);
      setValidationErrors(errors);

      if (Object.keys(errors).length === 0) {
        updateUser();
      }
    },
    onCancel: () => {
      setEditedUser(user);
      setIsEdit(false);
      setValidationErrors({});
    },
  };

  const items = [
    {
      key: "details",
      label: <span style={{ fontSize: 16, fontWeight: 600 }}>{user.name}</span>,
      children: <UserForm user={editedUser} config={config} />,
      extra: (
        <Space>
          <EditUser
            isEdit={isEdit}
            hasChanged={hasChanged}
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
