import { useState } from "react";
import type { User } from "../../../shared/types";
import { EditUser } from "../features/UpdateUser/EditUser";
import type { UserFormConfig } from "../types";
import { UserForm } from "./UserForm";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const config: UserFormConfig = {
    isEdit,
    showDetails,
    onToggleDetails: () => setShowDetails(!showDetails),
    onChange: setEditedUser,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <UserForm user={editedUser} config={config} />

      <EditUser
        user={user}
        editedUser={editedUser}
        setEditedUser={setEditedUser}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};
