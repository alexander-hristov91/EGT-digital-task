import { BASE_URL } from "../../shared/constants";

export const ALL_USERS = `${BASE_URL}/users`

export const SINGLE_USER = (userId: string | number): string =>
  `${BASE_URL}/users/${userId}`;