export const BASE_URL = "https://jsonplaceholder.typicode.com"

export const ALL_USERS = `${BASE_URL}/users`

export const SINGLE_USER = (userId: string | number): string =>
  `${BASE_URL}/users/${userId}`;

export const USER_POSTS = (userId: string | number): string =>
  `${BASE_URL}/posts?userId=${userId}`;
