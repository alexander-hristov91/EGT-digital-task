import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../shared/types";
import { UserCard } from "../components/UserCard";

interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  const navigate = useNavigate();

  return (
    <Card
      title={user.name}
      style={{ width: 1230, marginBottom: 20 }}
      extra={
        <Button type="primary" onClick={() => navigate(`/users/${user.id}`)}>
          See Posts
        </Button>
      }
    >
      <UserCard user={user} />
    </Card>
  );
}