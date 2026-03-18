import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const UserPostsButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/users")} style={{ marginBottom: 16 }}>
      ← Back to Users
    </Button>
  );
};
