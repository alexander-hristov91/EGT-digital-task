import { Input } from "antd";
import { FieldError } from "./FieldError";

interface FormInputFieldProps {
  label: string;
  value: string;
  name: string;
  error?: string;
  isEdit: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isTextArea?: boolean;
  rows?: number;
}

const { TextArea } = Input;

export function FormInputField({
  label,
  value,
  name,
  error,
  isEdit,
  onChange,
  isTextArea = false,
  rows = 4,
}: FormInputFieldProps) {
  if (!isEdit) {
    return (
      <div>
        <strong>{label}:</strong> <span>{value || "-"}</span>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{label}</div>
      {isTextArea ? (
        <TextArea
          name={name}
          value={value}
          onChange={onChange}
          size="small"
          status={error ? "error" : undefined}
          rows={rows}
        />
      ) : (
        <Input
          name={name}
          value={value}
          onChange={onChange}
          size="small"
          status={error ? "error" : undefined}
        />
      )}
      <FieldError error={error} />
    </div>
  );
}
