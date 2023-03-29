import React, { useState } from 'react';
import classNames from 'classnames';
import { useFetchAllPostsQuery, useCreatePostMutation } from '../services/posts';
import { Loader } from './Loader';
import { useDispatch } from 'react-redux';
import { create } from '../store/postsSlice';

export const CreatePost: React.FC = () => {
  const posts = useFetchAllPostsQuery(0);
  const dispatch = useDispatch();
  const [createPost, createResult] = useCreatePostMutation();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isError, setIsError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setBody('');
  };

  const validate = () => {
    if (!title.trim() || !body.trim()) {
      setIsError(true);
      setTitle((prevState) => prevState.trim());
      setBody((prevState) => prevState.trim());

      return false;
    }

    return true;
  };

  const onPostCreate = async () => {
    if (!validate()) {
      return;
    }

    setIsError(false);

    try {
      const newPost = {
        title,
        body,
      };

      await createPost(newPost);
    } catch {
      setIsError(true);
    } finally {
      dispatch(create(false));
      resetForm();
      posts.refetch();
    }
  };

  return createResult.isLoading ? (
    <Loader />
  ) : (
    <div className='content'>
      <div className='content'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPostCreate();
          }}
        >
          <h3>Create new post</h3>
          <div className='field'>
            <label className='label' htmlFor='comment-author-name'>
              Title
            </label>

            <div className='control has-icons-left has-icons-right'>
              <input
                type='text'
                name='name'
                id='comment-author-name'
                placeholder='Enter new title'
                className={classNames('input', {
                  'is-danger': isError && !title,
                })}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <span className='icon is-small is-left'>
                <i className='fas fa-user' />
              </span>

              {isError && !title && (
                <span className='icon is-small is-right has-text-danger'>
                  <i className='fas fa-exclamation-triangle' />
                </span>
              )}
            </div>

            {isError && !title && <p className='help is-danger'>Name is required</p>}
          </div>

          <div className='field'>
            <label className='label' htmlFor='comment-body'>
              Body
            </label>

            <div className='control'>
              <textarea
                id='comment-body'
                name='body'
                placeholder='Type new body'
                className={classNames('textarea', {
                  'is-danger': isError && !body,
                })}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            {isError && !body && <p className='help is-danger'>Enter some text</p>}
          </div>

          <div className='field is-grouped'>
            <div className='control'>
              <button
                type='submit'
                className={classNames('button is-link', {
                  'is-loading': posts.isLoading,
                })}
              >
                Create
              </button>
            </div>
            <div className='control'>
              <button type='reset' className='button is-link is-light' onClick={resetForm}>
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
