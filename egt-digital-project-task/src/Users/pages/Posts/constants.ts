import { BASE_URL } from "../../shared/constants";

export const USER_POSTS = (userId: string | number): string =>
  `${BASE_URL}/posts?userId=${userId}`;