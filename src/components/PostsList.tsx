import React from 'react';
import { Loader } from './Loader';
import { PostPreview } from './PostPreview';
import { useFetchAllPostsQuery } from '../services/posts';

export const PostsList: React.FC = () => {
  const { data: posts, isError, isLoading } = useFetchAllPostsQuery(0);

  return (
    <>
      <p className='title'>Posts:</p>
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
