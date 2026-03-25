import { Input } from "antd";
import { FieldError } from "./FieldError";

interface FormInputFieldProps {
  label: string;
  value: string;
  name: string;
  error?: string;
  isEdit: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputField({
  label,
  value,
  name,
  error,
  isEdit,
  onChange,
}: FormInputFieldProps) {
  if (!isEdit) {
    return (
      <div>
        <strong>{label}</strong>
        <div>{value || "-"}</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <strong>{label}</strong>
      </div>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        size="small"
        status={error ? "error" : undefined}
      />
      <FieldError error={error} />
    </div>
  );
}
