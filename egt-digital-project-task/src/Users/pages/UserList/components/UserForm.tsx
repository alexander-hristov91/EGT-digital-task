import { Form, Input, Row } from "antd";
import { getUserFields } from "../utils/userFields";
import type { User } from "../../../shared/types";

interface UserFormProps {
  isEdit: boolean;
  user: User;
}

export function UserForm({ isEdit, user }: UserFormProps) {
  return (
    <Row key={user.id} gutter={[12, 12]}>
      {getUserFields().map(({ key, label }) => {
        return (
          <div
            key={key}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label={<strong>{label}</strong>}
              name={key.split(".")}
              rules={[
                {
                  required: true,
                  message: `${label} is required`,
                  validateTrigger: "onFinish",
                },
              ]}
            >
              <Input
                variant={isEdit ? "underlined" : "filled"}
                readOnly={!isEdit}
              />
            </Form.Item>
          </div>
        );
      })}
    </Row>
  );
}
