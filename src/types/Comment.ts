export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type ICommentData = {
  postId: number;
  name: string;
  email: string;
  body: string;
};
