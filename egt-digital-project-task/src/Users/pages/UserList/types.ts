import type { User } from "../../shared/types";

export interface UsersState {
  userItems: User[];
  hashmap: Record<number, User>;
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
}

export interface EditStateProps {
  isEditing: boolean;
  editedUser: User;
  setEditedUser: (user: User) => void;
  onSuccessCallback: (save?: boolean) => void;
  startEditing: () => void;
  hasChanges: boolean;
}

export interface ActionsConfig {
  isEdit: boolean;
  onChange?: (user: User) => void;
  errors?: Record<string, string>;
}
