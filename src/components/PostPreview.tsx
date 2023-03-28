import React, { FC } from 'react';
import { IPost } from '../types/Post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { edit, select } from '../store/postsSlice';

interface Props {
  post: IPost;
}

export const PostPreview: FC<Props> = ({ post }) => {
  const { id, title } = post;

  const { editPostId, selectedPostId } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  const handlePostSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(select(Number(event.currentTarget.value)));
    dispatch(edit(0));
  };

  const handleForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(select(0));
    dispatch(edit(Number(event.currentTarget.value)));
  };

  const handleClose = () => {
    dispatch(select(0));
    dispatch(edit(0));
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td className='has-text-right is-flex is-justify-content-flex-end'>
        {selectedPostId !== id && editPostId !== id && (
          <>
            <button
              type='button'
              className='button is-warning is-light mr-2'
              onClick={handleForm}
              value={id}
            >
              Edit
            </button>
            <button
              type='button'
              className='button is-link is-light'
              onClick={handlePostSelection}
              value={id}
            >
              Open
            </button>
          </>
        )}
        {(selectedPostId === id || editPostId === id) && (
          <button type='button' className='button is-link' onClick={handleClose}>
            Close
          </button>
        )}
      </td>
    </tr>
  );
};
