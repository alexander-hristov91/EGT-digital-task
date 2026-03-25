import type {  Post } from "../types";
import { Input } from "antd";
import { FormInputField } from "../../../shared/FormInputField";
import { FieldError } from "../../../shared/FieldError";
import type { ActionsConfig } from "../../../shared/types";

const { TextArea } = Input;

interface PostFormProps {
  post: Post;
  config: ActionsConfig<Post>;
}

export function PostForm({ post, config }: PostFormProps) {
  const { isEdit, onChange, errors } = config;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!onChange) return;
    const { name, value } = e.target;
    onChange({ ...post, [name]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <FormInputField
        label="Title"
        value={post.title}
        name="title"
        error={errors?.title}
        isEdit={isEdit}
        onChange={handleChange}
      />

      <div>
        <div>
          <strong>Body</strong>
        </div>
        {isEdit ? (
          <>
            <TextArea
              name="body"
              value={post.body}
              onChange={handleChange}
              size="small"
              status={errors?.body ? "error" : undefined}
              rows={4}
            />
            <FieldError error={errors?.body} />
          </>
        ) : (
          <div>{post.body || "-"}</div>
        )}
      </div>
    </div>
  );
}
