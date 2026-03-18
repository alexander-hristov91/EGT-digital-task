import { Input } from "antd";
import type { Post } from "../types";

const { TextArea } = Input;

interface PostEditModeProps {
  post: Post;
  setEditedPost: (post: Post) => void;
}

export default function PostEditMode({
  post,
  setEditedPost,
  
}: PostEditModeProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPost({ ...post, [name]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <strong>Title:</strong>
        <Input
          name="title"
          value={post.title}
          onChange={handleChange}
          style={{ marginTop: 8, width: "100%" }}
          
        />
      </div>
      <div>
        <strong>Body:</strong>
        <TextArea
          name="body"
          value={post.body}
          onChange={handleChange}
          style={{ marginTop: 8, width: "100%" }}
          rows={4}
          
        />
      </div>
    </div>
  );
}