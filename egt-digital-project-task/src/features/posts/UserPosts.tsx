// features/posts/UserPosts.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function UserPosts() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => navigate("/users")}>
        ← Back to Users
      </Button>
      <h1>Post {id}</h1>
    </div>
  );
}