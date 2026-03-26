import type { Post } from "../types";

export function hasPostChanges(
  original: Post,
  edited: Partial<Post> | undefined,
): boolean {
  if (!edited) return false;

  return original.title !== edited.title || original.body !== edited.body;
}
