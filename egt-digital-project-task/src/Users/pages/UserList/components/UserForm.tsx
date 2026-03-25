import { Col, Row } from "antd";
import type { ActionsConfig, User } from "../../../shared/types";
import { getUserFields, getUserFieldValue } from "../utils/userFields";
import { FormInputField } from "../../../shared/FormInputField";

interface UserFormProps {
  user: User;
  config: ActionsConfig<User>;
  errors?: Record<string, string>;
}

export function UserForm({ user, config }: UserFormProps) {
  const { isEdit, onChange, errors } = config;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
            <FormInputField
              label={label}
              value={value}
              name={key}
              error={error}
              isEdit={isEdit}
              onChange={handleChange}
            />
          </Col>
        );
      })}
    </Row>
  );
}
