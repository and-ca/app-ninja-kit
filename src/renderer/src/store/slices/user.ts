import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    email: ''
  },
  reducers: {
    init: (state, { payload }) => {
      return {
        ...state,
        ...payload
      };
    }
  }
});

export const { init } = user.actions;

export default user.reducer;
