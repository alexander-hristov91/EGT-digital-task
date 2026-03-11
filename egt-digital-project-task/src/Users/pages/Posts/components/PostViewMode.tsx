import { Typography } from "antd";
import type { Post } from "../types";

const { Paragraph } = Typography;

interface PostViewModeProps {
  post: Post;
}

export default function PostViewMode({ post }: PostViewModeProps) {
  return (
    <>
      <Paragraph>
        <strong>ID:</strong> {post.id}
      </Paragraph>
      <Paragraph>
        <strong>Body:</strong> {post.body}
      </Paragraph>
    </>
  );
}