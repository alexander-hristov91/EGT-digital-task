import type { Post } from "../types";


export function validatePostFields(post: Post): Record<string, string> {

  const errors: Record<string, string> = {};

  if (!post.title.trim()) {
    errors.title = "Title is required";
  }

  if (!post.body || !post.body.trim()) {
    errors.body = "Body is required";
  }

  return errors;
}
