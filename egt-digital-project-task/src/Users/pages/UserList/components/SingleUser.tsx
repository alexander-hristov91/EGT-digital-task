import { Button, Collapse, Space } from "antd";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../shared/types";
import { useState } from "react";
import type { ActionsConfig } from "../types";
import { UserForm } from "./UserForm";
import { EditUser } from "../features/UpdateUser/EditUser";
import { validateUserFields } from "../utils/userFields";
import { hasUserChanges } from "../utils/compareUsers";


interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const errors = validateUserFields(editedUser); 

  const hasChanged = hasUserChanges(user, editedUser)

  const config: ActionsConfig = {
    isEdit,
    onChange: setEditedUser,
  };

  const items = [
    {
      key: "details",
      label: <span style={{ fontSize: 16, fontWeight: 600 }}>{user.name}</span>,
      children: <UserForm user={editedUser} config={config} errors={errors}/>,
      extra: (
        <Space>
          <EditUser
            user={user}
            editedUser={editedUser}
            setEditedUser={setEditedUser}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            hasChanged={hasChanged}
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
