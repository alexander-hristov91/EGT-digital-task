import type { Post } from "../types";

export interface PostField {
  key: keyof Post;
  label: string;
}

export function getPostFields(): PostField[] {
  return [
    { key: "title", label: "Title" },
    { key: "body", label: "Body" },
  ];
}

export function getPostFieldValue(post: Post, key: keyof Post): string {
  const value = post[key];
  return value !== null && value !== undefined ? String(value) : "";
}

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
