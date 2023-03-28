import React, { useState } from 'react';
import { Loader } from './Loader';
import { CommentsList } from './CommentsList';
import { NewCommentForm } from './NewCommentForm';
import { useFetchPostByIdQuery } from '../services/posts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const PostDetails: React.FC = () => {
  const [isFormOpened, setIsFormOpened] = useState(false);
  
  const { selectedPostId } = useSelector((state: RootState) => state.posts);
  const { data: post, isError, isFetching } = useFetchPostByIdQuery(selectedPostId);

  return (
    <div className='content'>
      <div className='content'>
        {isFetching ? (
          <Loader />
        ) : post && !isError ? (
          <div className='block'>
            <h2>{post.title}</h2>

            <p>{post.body}</p>
            <CommentsList comments={post.comments} isLoading={isFetching} />

            <button
              type='button'
              className='button is-link mb-2'
              onClick={() => setIsFormOpened(!isFormOpened)}
            >
              {isFormOpened ? 'Discard comment' : 'Write a comment'}
            </button>

            {isFormOpened && post && <NewCommentForm postId={post.id} />}
          </div>
        ) : (
          <div>Error</div>
        )}
      </div>
    </div>
  );
};
