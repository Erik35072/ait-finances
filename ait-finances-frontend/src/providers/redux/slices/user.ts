import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { User } from "../../../types/user";

interface Slice {
  user: User | null;
}

interface Reducers extends SliceCaseReducers<Slice> {
  userLogin: CaseReducer<Slice, PayloadAction<{ user: User }>>;
  userSignOut: CaseReducer<Slice, PayloadAction>;
}

const initialState = {
  user: null
};

const user_slice = createSlice<Slice, Reducers>({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload.user;
    },
    userSignOut: state => {
      state.user = null;
    },
    update: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload.userUpdatableContent };
      }
    }
  }
});

export const { userLogin, userSignOut, update } = user_slice.actions;

export const getUserFullInformation = (state: Slice) => state.user;

export default user_slice.reducer;
