import type { User } from "../../shared/types";

export interface UsersState {
  userItems: User[];
  hashmap: Record<number, User>;
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
}