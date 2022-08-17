export interface PostState {
  list: Post[];
  loading: boolean;
  error: string | null;
}

export interface Post {
  id: string;
  user: string;
  content: string;
}