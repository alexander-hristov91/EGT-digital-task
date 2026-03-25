import { Form, Input } from "antd";

const { TextArea } = Input;

interface PostFormProps {
  isEdit: boolean;
}

export function PostForm({ isEdit }: PostFormProps) {
  return (
    <div
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
        label={<strong>Title</strong>}
        name="title"
        rules={[
          {
            required: true,
            message: "Title is required",
            validateTrigger: "onFinish",
          },
        ]}
      >
        <Input variant={isEdit ? "underlined" : "filled"} readOnly={!isEdit} />
      </Form.Item>

      <Form.Item
        label={<strong>Body</strong>}
        name="body"
        rules={[
          {
            required: true,
            message: "Body is required",
            validateTrigger: "onFinish",
          },
        ]}
      >
        <TextArea
          variant={isEdit ? "underlined" : "filled"}
          readOnly={!isEdit}
          size="small"
          rows={4}
        />
      </Form.Item>

      <Form.Item name="userId" hidden>
        <Input />
      </Form.Item>
    </div>
  );
}
