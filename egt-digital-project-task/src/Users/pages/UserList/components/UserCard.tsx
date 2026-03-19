import { Typography, Button } from "antd";
import type { User } from "../../../shared/types";
import { getUserFields, getUserFieldValue } from "../utils/userFields";

const { Paragraph } = Typography;

interface UserCardProps {
  user: User;
  onEdit: () => void;
}

export const UserCard = ({ user, onEdit }: UserCardProps) => {
  const fields = getUserFields();

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {fields.map(({ key, label }) => (
          <Paragraph key={key} style={{ marginBottom: 8 }}>
            <strong>{label}:</strong> {getUserFieldValue(user, key)}
          </Paragraph>
        ))}
      </div>
      <Button type="primary" onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
};