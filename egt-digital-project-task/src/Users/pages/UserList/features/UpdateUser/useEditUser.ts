import { useState } from "react";
import { message } from "antd";
import { useAppDispatch } from "../../../../../shared/hooks";
import { updateUserInList } from "../../userSlice";
import { SINGLE_USER_URL } from "../../constants";
import type { User } from "../../../../shared/types";

export function useUserEdit() {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const updateUser = async (
    userData: User,
    onSuccessCallback?: (updatedUser: User) => void,
  ) => {
    setIsUpdating(true);

    try {
      const response = await fetch(SINGLE_USER_URL(userData.id), {
        method: "PATCH",
        body: JSON.stringify(userData),
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
  };

  return { updateUser, isUpdating };
}
