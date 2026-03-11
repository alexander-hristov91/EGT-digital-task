import { Input } from "antd";

const { TextArea } = Input;

interface PostEditModeProps {
  title: string;
  body: string;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  disabled?: boolean;
}

export default function PostEditMode({
  title,
  body,
  onTitleChange,
  onBodyChange,
  disabled = false,
}: PostEditModeProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <strong>Title:</strong>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          style={{ marginTop: 8, width: "100%" }}
          disabled={disabled}
        />
      </div>
      <div>
        <strong>Body:</strong>
        <TextArea
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
          style={{ marginTop: 8, width: "100%" }}
          rows={4}
          disabled={disabled}
        />
      </div>
    </div>
  );
}