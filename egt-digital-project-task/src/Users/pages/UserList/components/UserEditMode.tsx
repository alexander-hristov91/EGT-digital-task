import { Input } from "antd";
import type { User } from "../../../shared/types";
import { getUserFields, getUserFieldValue } from "../utils/userFields";

interface UserEditModeProps {
  user: User;
  setEditedUser: (user: User) => void;
}

export default function UserEditMode({
  user,
  setEditedUser,
}: UserEditModeProps) {
  const fields = getUserFields();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length > 1) {
      const [parent, child] = keys;
      setEditedUser({
        ...user,
        [parent]: {
          ...(user[parent as keyof User] as object),
          [child]: value,
        },
      });
    } else {
      setEditedUser({ ...user, [name]: value });
    }
  };

  const renderInput = ({ key, label }: ReturnType<typeof getUserFields>[number]) => {
    const value = getUserFieldValue(user, key);

    return (
      <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 120, fontWeight: 600 }}>{label}:</span>
        <Input
          name={key}
          value={value}
          onChange={handleChange}
          size="small"
          style={{ flex: 1 }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {fields.map(renderInput)}
    </div>
  );
}