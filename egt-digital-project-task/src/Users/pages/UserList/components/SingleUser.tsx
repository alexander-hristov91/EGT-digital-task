import { Card, Collapse, Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../shared/types";
import { UserCard } from "./UserCard";
import { useState } from "react";
import UserEditMode from "./UserEditMode";
import { EditUser } from "../features/UpdateUser/UpdateUser";
import { hasUserChanges } from "../utils/compareUsers";

interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [panelOpen, setPanelOpen] = useState<boolean>(false);

  const startEditing = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const stopEditing = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const hasChanges = hasUserChanges(user, editedUser);

  const editState = {
    isEditing,
    editedUser,
    setEditedUser,
    stopEditing,
    startEditing,
    hasChanges,
  };

  const handleSeePosts = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <Card
      title={
        <span style={{ textAlign: "center", width: "106%", display: "block" }}>
          {user.name}
        </span>
      }
      style={{ width: 1230, marginBottom: 20 }}
      extra={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button type="primary" onClick={handleSeePosts}>
            See Posts
          </Button>
        </div>
      }
    >
      <Collapse
        activeKey={panelOpen ? [user.id] : []}
        onChange={(keys) =>
          setPanelOpen(Array.isArray(keys) && keys.length > 0)
        }
        items={[
          {
            key: user.id,
            label: (
              <Button type="default" block style={{ textAlign: "left" }}>
                {panelOpen ? "Hide Details" : "Show Details"}
                
              </Button>
            ),
            children: isEditing ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <EditUser editState={editState} />
                <UserEditMode user={editedUser} setEditedUser={setEditedUser} />
              </div>
            ) : (
              <UserCard user={user} onEdit={startEditing} />
            ),
          },
        ]}
        ghost
        expandIcon={() => null}
      />
    </Card>
  );
}
