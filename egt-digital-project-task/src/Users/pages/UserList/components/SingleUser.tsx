import { Card, Collapse, Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../shared/types";
import { UserCard } from "./UserCard";



interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  const navigate = useNavigate();

  const handleSeePosts = () => {
    navigate(`/users/${user.id}`);
  };
  const collapseItems = [
    {
      key: user.id,
      label: <Button>Show Details and Edit</Button>,
      children: (
        <UserCard user={user} />
      ),
    },
  ];

  return (
    <Card
      title={
        <span style={{ textAlign: "center", width: "106%", display: "block" }}>
          {user.name}
        </span>
      }
      style={{ width: 1230, marginBottom: 20 }}
      extra={
        <Button type="primary" onClick={handleSeePosts}>
          See Posts
        </Button>
      }
    >
      <Collapse items={collapseItems} ghost expandIcon={() => null} />
    </Card>
  );
}
