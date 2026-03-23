import { Col, Input, Row } from "antd";
import type { User } from "../../../shared/types";
import type { ActionsConfig } from "../types";
import { getUserFields, getUserFieldValue } from "../utils/userFields";
import { FieldError } from "../../../shared/FieldError";

interface UserFormProps {
  user: User;
  config: ActionsConfig;
  errors?: Record<string, string>;
}

export function UserForm({ user, config, errors }: UserFormProps) {
  const { isEdit, onChange } = config;

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

  return (
    <Row gutter={[12, 12]}>
      {getUserFields().map(({ key, label }) => {
        const value = getUserFieldValue(user, key);
        const error = errors?.[key];  

        return (
          <Col xs={24} lg={8} key={key} style={{ marginBottom: 16 }}>
            {isEdit ? (
              <div>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>
                  {label}
                </div>
                <Input
                  name={key}
                  value={value}
                  onChange={handleChange}
                  size="small"
                  status={error ? "error" : undefined} 
                />
                <FieldError error={error} />
              </div>
            ) : (
              <div>
                <strong>{label}:</strong> <span>{value || "-"}</span>
              </div>
            )}
          </Col>
        );
      })}
    </Row>
  );
}