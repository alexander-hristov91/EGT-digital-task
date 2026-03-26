import { Col, Form, Input, Row } from "antd";
import { getUserFields } from "../utils/userFields";
import type { User } from "../../../shared/types";

interface UserFormProps {
  isEdit: boolean;
  user: User;
}

export function UserForm({ isEdit }: UserFormProps) {
  return (
    <Row gutter={[16, 16]}>
      {getUserFields().map(({ key, label }) => {
        const reactKey = Array.isArray(key) ? key.join(".") : key;
        return (
          <Col span={12} key={reactKey}>
            <Form.Item
              label={<strong>{label}</strong>}
              name={key}
              style={{ marginBottom: 0 }}
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
          </Col>
        );
      })}
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
    </Row>
  );
}
