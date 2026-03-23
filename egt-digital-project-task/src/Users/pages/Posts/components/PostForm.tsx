import { Input } from "antd";
import type { ActionsConfig, Post } from "../types";
import { getPostFields, getPostFieldValue } from "../utils/postFields";
import { FieldError } from "../../../shared/FieldError";

interface PostFormProps {
  post: Post;
  config: ActionsConfig;
  errors?: Record<string, string>;
}

const { TextArea } = Input;

export function PostForm({ post, config, errors }: PostFormProps) {
  const { isEdit, onChange } = config;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!onChange) return;

    const { name, value } = e.target;
    onChange({ ...post, [name]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {getPostFields().map(({ key, label }) => {
        const value = getPostFieldValue(post, key);
        const error = errors?.[key];

        return (
          <div key={key}>
            {isEdit ? (
              <>
                {key === "body" ? (
                  <TextArea
                    name={key}
                    value={value}
                    onChange={handleChange}
                    size="small"
                    status={error ? "error" : undefined}
                    rows={4}
                  />
                ) : (
                  <Input
                    name={key}
                    value={value}
                    onChange={handleChange}
                    size="small"
                    status={error ? "error" : undefined}
                  />
                )}
                <FieldError error={error} />
              </>
            ) : (
              <div>
                <strong>{label}:</strong> <span>{value || "-"}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
