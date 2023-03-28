import React, { FC } from 'react';
import { IComment } from '../types/Comment';

interface Props {
  comment: IComment;
}

export const CommentElement: FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <article className='message is-small'>
      <div className='message-header'>
        <a href={`mailto:${email}`}>{name}</a>
      </div>

      <div className='message-body'>{body}</div>
    </article>
  );
};
