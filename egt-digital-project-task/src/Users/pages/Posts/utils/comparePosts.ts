import type { Post } from "../types";

export function hasPostChanges(original: Post, edited: Post): boolean {
  return JSON.stringify(original) !== JSON.stringify(edited);
}
