import { useState, useCallback } from "react";
import { message } from "antd";
import { useAppDispatch } from "../../../../../shared/hooks";
import { updateUserInList } from "../../userSlice";
import { SINGLE_USER } from "../../constants";
import type { User } from "../../../../shared/types";

interface UseUserEditProps {
  editedUser: User;
  stopEditing: () => void;
}

export function useUserEdit({ editedUser, stopEditing }: UseUserEditProps) {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const updateUser = useCallback(async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(SINGLE_USER(editedUser.id), {
        method: "PATCH",
        body: JSON.stringify({
          id: editedUser.id,
          name: editedUser.name,
          username: editedUser.username,
          email: editedUser.email,
          phone: editedUser.phone,
          website: editedUser.website,
          address: editedUser.address,
          company: editedUser.company,
        }),
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

      stopEditing();
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to update user",
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [dispatch, editedUser, stopEditing]);

  return { updateUser, isUpdating };
}
