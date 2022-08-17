export interface CommentState {
  list: Comment[];
  loading: boolean;
  error: string | null;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  postId: string;
  responses: Comment[];
  responseId?: string;
}
