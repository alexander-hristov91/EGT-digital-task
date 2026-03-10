export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostsState {
  postsItems: Post[];
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
  updatingPostId: number | null;
  deletingPostId: number | null;
}