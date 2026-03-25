interface FieldErrorProps {
  error?: string;
}

export function FieldError({ error }: FieldErrorProps) {
  if (!error) return null;

  return (
    <div style={{ color: "#e42314", fontSize: 12, marginTop: 4 }}>{error}</div>
  );
}
