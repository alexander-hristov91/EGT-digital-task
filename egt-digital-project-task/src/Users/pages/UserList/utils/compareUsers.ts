import type { User } from "../../../shared/types";

export function hasUserChanges(original: User, edited: User): boolean {
  return JSON.stringify(original) !== JSON.stringify(edited);
}