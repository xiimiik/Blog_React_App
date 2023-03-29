import React from 'react';
import { Loader } from './Loader';
import { PostPreview } from './PostPreview';
import { useFetchAllPostsQuery } from '../services/posts';
import { useDispatch, useSelector } from 'react-redux';
import { create, edit, select } from '../store/postsSlice';
import { RootState } from '../store';

export const PostsList: React.FC = () => {
  const { createNewPost } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const { data: posts, isError, isLoading } = useFetchAllPostsQuery(0);

  const handleCreatePostForm = () => {
    dispatch(create(!createNewPost));
    dispatch(edit(0));
    dispatch(select(0));
  };

  return (
    <>
      <div className='is-flex is-justify-content-space-between'>
        <p className='title'>Posts:</p>
        {createNewPost ? (
          <button type='button' className='button is-link' onClick={handleCreatePostForm}>
            Close
          </button>
        ) : (
          <button type='reset' className='button is-success' onClick={handleCreatePostForm}>
            Create new!
          </button>
        )}
      </div>
      {isLoading && <Loader />}
      {isError && <div className='notification is-danger'>Something went wrong!</div>}

      {posts && !!posts.length && !isLoading ? (
        <table className='table is-fullwidth is-striped is-hoverable is-narrow'>
          <thead>
            <tr className='has-background-link-light'>
              <th>#</th>
              <th>Title</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className='notification is-warning'>No posts yet</div>
      )}
    </>
  );
};
