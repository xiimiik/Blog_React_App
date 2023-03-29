import { createSlice } from '@reduxjs/toolkit';

const defaultValue = {
  selectedPostId: 0,
  editPostId: 0,
  createNewPost: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: defaultValue,
  reducers: {
    select(state, action) {
      state.selectedPostId = action.payload;
    },
    edit(state, action) {
      state.editPostId = action.payload;
    },
    create(state, action) {
      state.createNewPost = action.payload;
    },
  },
});

export const { select, edit, create } = postsSlice.actions;
export default postsSlice.reducer;
