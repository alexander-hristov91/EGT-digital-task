import { Input } from "antd";
import type { User } from "../../../shared/types";

interface UserEditModeProps {
  user: User;
  setEditedUser: (user: User) => void;
}

export default function UserEditMode({
  user,
  setEditedUser,
}: UserEditModeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
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

  const renderInput = (name: string, label: string, value: string) => {
    return (
      <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 120, fontWeight: 600 }}>{label}:</span>
        <Input
          name={name}
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
      {renderInput("username", "UserName", user.username)}
      {renderInput("email", "Email", user.email)}
      {renderInput("address.street", "Street", user.address.street)}
      {renderInput("address.suite", "Suite", user.address.suite)}
      {renderInput("address.city", "City", user.address.city)}
      {renderInput("name", "Name", user.name)}
      {renderInput("phone", "Phone", user.phone)}
      {renderInput("website", "Website", user.website)}
      {renderInput("company.name", "CompanyName", user.company.name)}
      {renderInput(
        "company.catchPhrase",
        "CatchPhrase",
        user.company.catchPhrase,
      )}
      {renderInput("company.bs", "CompanyBS", user.company.bs)}
    </div>
  );
}
