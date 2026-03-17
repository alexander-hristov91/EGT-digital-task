import { Typography, Button } from "antd";
import type { User } from "../../../shared/types";

const { Paragraph } = Typography;

interface UserCardProps {
  user: User;
  onEdit: () => void;
}

export const UserCard = ({ user, onEdit }: UserCardProps) => {
  const userFields = [
    { label: "Name", value: user.name },
    { label: "UserName", value: user.username },
    { label: "Email", value: user.email },
    { label: "Street", value: user.address.street },
    { label: "Suite", value: user.address.suite },
    { label: "City", value: user.address.city },
    { label: "ZipCode", value: user.address.zipcode },
    { label: "Phone", value: user.phone },
    { label: "Website", value: user.website },
    { label: "CompanyName", value: user.company.name },
    { label: "CatchPhrase", value: user.company.catchPhrase },
    { label: "CompanyBS", value: user.company.bs },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {userFields.map(({ label, value }) => (
          <Paragraph key={label} style={{ marginBottom: 8 }}>
            <strong>{label}:</strong> {value}
          </Paragraph>
        ))}
      </div>
      <Button type="primary" onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}