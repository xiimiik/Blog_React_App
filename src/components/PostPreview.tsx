import React, { FC } from 'react';
import { IPost } from '../types/Post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { create, edit, select } from '../store/postsSlice';

interface Props {
  post: IPost;
}

export const PostPreview: FC<Props> = ({ post }) => {
  const { id, title } = post;

  const { editPostId, selectedPostId } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  const handlePostSelection = () => {
    dispatch(select(id));
    dispatch(edit(0));
    dispatch(create(false));
  };

  const handleForm = () => {
    dispatch(select(0));
    dispatch(edit(id));
    dispatch(create(false));
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
            <a href='#details' className='button is-warning is-light mr-2' onClick={handleForm}>
              Edit
            </a>
            <a href='#details' className='button is-link is-light' onClick={handlePostSelection}>
              Open
            </a>
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
