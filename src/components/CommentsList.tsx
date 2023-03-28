import { FC } from 'react';
import { Loader } from './Loader';
import { CommentElement } from './CommentElement';
import { IComment } from '../types/Comment';

interface Props {
  comments: IComment[] | null;
  isLoading: boolean;
}

export const CommentsList: FC<Props> = ({ comments, isLoading }) => {
  return (
    <div className='block'>
      {isLoading && <Loader />}

      {comments && !comments.length ? (
        <p className='title is-4'>No comments yet</p>
      ) : (
        <p className='title is-4'>Comments:</p>
      )}

      {comments && comments.map((comment) => <CommentElement key={comment.id} comment={comment} />)}
    </div>
  );
};
