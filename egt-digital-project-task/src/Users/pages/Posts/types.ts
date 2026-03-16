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

}

export interface EditStateProps {
  isEditing: boolean;
  editedPost: Post;
  setEditedPost: (post: Post) => void;
  stopEditing: (save?: boolean) => void;
  startEditing: () => void;
}