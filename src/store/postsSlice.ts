import { createSlice } from '@reduxjs/toolkit';

const defaultValue = {
  selectedPostId: 0,
  editPostId: 0,
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
  },
});

export const { select, edit } = postsSlice.actions;
export default postsSlice.reducer;
