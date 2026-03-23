import { useState, useCallback } from "react";
import { message } from "antd";
import { useAppDispatch } from "../../../../../shared/hooks";
import { updateUserInList } from "../../userSlice";
import { SINGLE_USER } from "../../constants";
import type { User } from "../../../../shared/types";
import { validateUserFields } from "../../utils/userFields";

interface UseUserEditOptions {
  editedUser: User;
  onSuccessCallback?: () => void;
}

export function useUserEdit({ editedUser, onSuccessCallback }: UseUserEditOptions) {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const updateUser = useCallback(async () => {
    const validationErrors = validateUserFields(editedUser);
    const errorKeys = Object.keys(validationErrors);
    
    if (errorKeys.length > 0) {
      message.error(validationErrors[errorKeys[0]]);
      return false;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(SINGLE_USER(editedUser.id), {
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

      onSuccessCallback?.();
      return true;
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to update user",
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [dispatch, editedUser, onSuccessCallback]);

  return { updateUser, isUpdating };
}