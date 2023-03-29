import 'bulma/bulma.sass';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { EditPost } from './components/EditPost';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { CreatePost } from './components/CreatePost';

export const App: React.FC = () => {
  const { editPostId, selectedPostId, createNewPost } = useSelector(
    (state: RootState) => state.posts,
  );

  return (
    <main className='section' id='details'>
      <div className='container'>
        <div className='tile is-ancestor'>
          <div className='tile is-parent'>
            <div className='tile is-child box is-success'>
              <div className='block'>
                <PostsList />
              </div>
            </div>
          </div>

          <div
            className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': !!selectedPostId || !!editPostId || !!createNewPost,
            })}
          >
            <div className='tile is-child box is-success '>
              {!!selectedPostId && <PostDetails />}
              {!!editPostId && <EditPost />}
              {!!createNewPost && <CreatePost />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
