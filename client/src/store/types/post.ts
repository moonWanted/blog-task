export interface PostState {
  list: Post[];
  loading: boolean;
  error: string | null;
  currentPostId: string | null;
}

export interface Post {
  id: string;
  user: string;
  content: string;
}