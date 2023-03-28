import React, { useState } from 'react';
import classNames from 'classnames';
import {
  useDeletePostByIdMutation,
  useFetchAllPostsQuery,
  useUpdatePostByIdMutation,
} from '../services/posts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Loader } from './Loader';
import { edit } from '../store/postsSlice';

export const EditPostForm: React.FC = () => {
  const { editPostId } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const posts = useFetchAllPostsQuery(0);
  const [updatePost, updateResult] = useUpdatePostByIdMutation();
  const [deletePost, deleteResult] = useDeletePostByIdMutation();

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

  const onPostUpdate = async () => {
    if (!validate()) {
      return;
    }

    setIsError(false);

    try {
      const editedPost = {
        title,
        body,
      };

      await updatePost({ id: editPostId, body: editedPost });
    } catch {
      setIsError(true);
    } finally {
      setBody('');
      posts.refetch();
    }
  };

  const onPostDelete = async () => {
    try {
      await deletePost(editPostId);
    } catch {
      setIsError(true);
    } finally {
      dispatch(edit(0));
      posts.refetch();
    }
  };

  return deleteResult.isLoading || updateResult.isLoading ? (
    <Loader />
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onPostUpdate();
      }}
    >
      <h3>{`Post #${editPostId}`}</h3>
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

      <div className='is-flex is-justify-content-space-between'>
        <div className='field is-grouped'>
          <div className='control'>
            <button
              type='submit'
              className={classNames('button is-link', {
                'is-loading': posts.isLoading,
              })}
            >
              Update
            </button>
          </div>
          <div className='control'>
            <button type='reset' className='button is-link is-light' onClick={resetForm}>
              Clear
            </button>
          </div>
        </div>

        <div className='control'>
          <button type='reset' className='button is-danger' onClick={onPostDelete}>
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};
