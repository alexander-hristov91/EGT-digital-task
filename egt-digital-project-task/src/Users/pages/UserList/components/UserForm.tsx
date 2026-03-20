import { Button, Collapse, Input } from "antd";
import type { User } from "../../../shared/types";
import type { UserFormConfig } from "../types";
import { getUserFields, getUserFieldValue } from "../utils/userFields";

interface UserFormProps {
  user: User;
  config: UserFormConfig;
}

export function UserForm({ user, config }: UserFormProps) {
  const { isEdit, showDetails, onToggleDetails, onChange } = config;
  const fields = getUserFields();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length > 1) {
      const [parent, child] = keys;
      onChange({
        ...user,
        [parent]: {
          ...(user[parent as keyof User] as object),
          [child]: value,
        },
      });
    } else {
      onChange({ ...user, [name]: value });
    }
  };

  const renderField = ({
    key,
    label,
  }: ReturnType<typeof getUserFields>[number]) => {
    const value = getUserFieldValue(user, key);

    if (!isEdit) {
      return (
        <div key={key} style={{ marginBottom: 8 }}>
          <strong>{label}:</strong> {value}
        </div>
      );
    }

    return (
      <div
        key={key}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span style={{ width: 100, fontWeight: 500 }}>{label}:</span>
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

  const items = [
    {
      key: "details",
      label: (
        <Button type="default" block style={{ textAlign: "left" }}>
          {isEdit ? "Edit User" : "User Details"}
        </Button>
      ),
      children: (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {fields.map(renderField)}
        </div>
      ),
    },
  ];

  return (
    <Collapse
      activeKey={showDetails ? "details" : []}
      onChange={onToggleDetails}
      items={items}
      ghost
    />
  );
}
