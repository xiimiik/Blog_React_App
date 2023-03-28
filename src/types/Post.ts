import { IComment } from './Comment';

export interface IPost {
  id: number;
  title: string;
  body: string;
}

export interface IPostWithComments extends IPost {
  comments: IComment[];
}
