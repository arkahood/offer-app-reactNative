import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  age: undefined,
  username: undefined,
  name: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      return {
        isAuthenticated: true,
        name: action.payload.name,
        username: action.payload.username,
        age: action.payload.age,
      };
    },
    removeAuth: state => {
      return {...state, isAuthenticated: false};
    },
  },
});

export const {setAuth, removeAuth} = authSlice.actions;
export default authSlice.reducer;
