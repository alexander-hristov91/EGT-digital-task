import { useState, useCallback } from "react";
import { message } from "antd";
import { useAppDispatch } from "../../../../../shared/hooks";
import { updateUserInList } from "../../userSlice";
import { SINGLE_USER_URL } from "../../constants";
import type { User } from "../../../../shared/types";

interface UseUserEditOptions {
  editedUser: User;
  onSuccessCallback?: (updatedUser: User) => void;
}

export function useUserEdit({
  editedUser,
  onSuccessCallback,
}: UseUserEditOptions) {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const updateUser = useCallback(async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(SINGLE_USER_URL(editedUser.id), {
        method: "PATCH",
        body: JSON.stringify(editedUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const updatedUser = await response.json();

      dispatch(updateUserInList({ user: updatedUser }));
      message.success("User updated successfully");

      onSuccessCallback?.(updatedUser);
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to update user",
      );
    } finally {
      setIsUpdating(false);
    }
  }, [dispatch, editedUser, onSuccessCallback]);

  return { updateUser, isUpdating };
}
