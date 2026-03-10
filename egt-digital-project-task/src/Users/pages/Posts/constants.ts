import { BASE_URL } from "../../shared/constants";

export const USER_POSTS = (userId: string | number): string =>
  `${BASE_URL}/posts?userId=${userId}`;

export const SINGLE_POST = (postId: string | number): string =>
  `${BASE_URL}/posts/${postId}`;

export const ALL_POSTS = `${BASE_URL}/posts`;