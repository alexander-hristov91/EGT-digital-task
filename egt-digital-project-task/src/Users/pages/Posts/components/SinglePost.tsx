import { Card, Typography } from "antd";
import type { Post } from "../../../shared/types";

const { Title, Paragraph } = Typography;

interface SinglePostProps {
  post: Post;
}

export default function SinglePost({ post }: SinglePostProps) {
  return (
    <Card 
      title={`Post #${post.id}`} 
      size="small"
      style={{ marginBottom: 16 }}
    >
      <Title level={5}>{post.title}</Title>
      <Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>
    </Card>
  );
}