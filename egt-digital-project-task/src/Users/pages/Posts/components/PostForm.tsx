import type { ActionsConfig, Post } from "../types";
import { FormInputField } from "../../../shared/FormInputField";

interface PostFormProps {
  post: Post;
  config: ActionsConfig;
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
      <FormInputField
        label="Body"
        value={post.body}
        name="body"
        error={errors?.body}
        isEdit={isEdit}
        onChange={handleChange}
        isTextArea
        rows={4}
      />
    </div>
  );
}
