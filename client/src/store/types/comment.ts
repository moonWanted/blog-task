export interface CommentState {
  list: Comment[];
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  postId: string;
  responses: Comment[];
  responseId?: string;
}
