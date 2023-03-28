import React, { useState } from 'react';
import classNames from 'classnames';
import { useCreateCommentMutation, useFetchPostByIdQuery } from '../services/posts';

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [commentName, setCommentName] = useState('');
  const [isError, setIsError] = useState(false);
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const post = useFetchPostByIdQuery(postId);
  const [createComment, resultComment] = useCreateCommentMutation();

  const resetForm = () => {
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  const validate = () => {
    if (!commentName.trim() || !commentEmail || !commentBody.trim()) {
      setIsError(true);
      setCommentName((prevState) => prevState.trim());
      setCommentEmail((prevState) => prevState.trim());
      setCommentBody((prevState) => prevState.trim());

      return false;
    }

    return true;
  };

  const onAddComment = async () => {
    if (!validate()) {
      return;
    }

    setIsError(false);

    try {
      const newComment = {
        postId,
        name: commentName,
        email: commentEmail,
        body: commentBody,
      };

      await createComment(newComment);
    } catch {
      setIsError(true);
    } finally {
      setCommentBody('');
      post.refetch();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddComment();
      }}
    >
      <div className='field'>
        <label className='label' htmlFor='comment-author-name'>
          Author Name
        </label>

        <div className='control has-icons-left has-icons-right'>
          <input
            type='text'
            name='name'
            id='comment-author-name'
            placeholder='Name Surname'
            className={classNames('input', {
              'is-danger': isError && !commentName,
            })}
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
          />

          <span className='icon is-small is-left'>
            <i className='fas fa-user' />
          </span>

          {isError && !commentName && (
            <span className='icon is-small is-right has-text-danger'>
              <i className='fas fa-exclamation-triangle' />
            </span>
          )}
        </div>

        {isError && !commentName && <p className='help is-danger'>Name is required</p>}
      </div>

      <div className='field'>
        <label className='label' htmlFor='comment-author-email'>
          Author Email
        </label>

        <div className='control has-icons-left has-icons-right'>
          <input
            type='email'
            name='email'
            id='comment-author-email'
            placeholder='email@test.com'
            className={classNames('input', {
              'is-danger': isError && !commentEmail,
            })}
            value={commentEmail}
            onChange={(e) => setCommentEmail(e.target.value)}
          />

          <span className='icon is-small is-left'>
            <i className='fas fa-envelope' />
          </span>

          <span className='icon is-small is-right has-text-danger'>
            {isError && !commentEmail && <i className='fas fa-exclamation-triangle' />}
          </span>
        </div>

        {isError && !commentEmail && <p className='help is-danger'>Email is required</p>}
      </div>

      <div className='field'>
        <label className='label' htmlFor='comment-body'>
          Comment Text
        </label>

        <div className='control'>
          <textarea
            id='comment-body'
            name='body'
            placeholder='Type comment here'
            className={classNames('textarea', {
              'is-danger': isError && !commentBody,
            })}
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
        </div>

        {isError && !commentBody && <p className='help is-danger'>Enter some text</p>}
      </div>

      <div className='field is-grouped'>
        <div className='control'>
          <button
            type='submit'
            className={classNames('button is-link', {
              'is-loading': resultComment.isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className='control'>
          {/* eslint-disable-next-line react/button-has-type */}
          <button type='reset' className='button is-link is-light' onClick={resetForm}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
