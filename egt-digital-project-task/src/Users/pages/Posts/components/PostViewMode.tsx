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
        <strong>Post title:</strong> {post.title}
      </Paragraph>
      <Paragraph>
        <strong>Post Body:</strong> {post.body}
      </Paragraph>
    </>
  );
}