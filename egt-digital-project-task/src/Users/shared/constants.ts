type BASE_URL = string;

export const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const SINGLE_USER = (userId: string | number): string =>
  `https://jsonplaceholder.typicode.com/users/${userId}`;

export const USER_POSTS = (userId: string | number): string =>
  `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
