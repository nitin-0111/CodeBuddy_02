import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import toast from "../../components/customToast";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/LocalStorage";


import { loginUserThunk, registerUserThunk} from "./userThunk";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

// export const clearStore=createAsyncThunk('user/clearStore',clearStoreThunk);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
     
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      // const { user } = payload;
      state.isLoading = false;
      // state.user=user; doubt
      
      toast.success({ msg: "successful verify email " });
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload);
      toast.error({ msg: payload });
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      console.log("extra reducr login: ", user);
      addUserToLocalStorage(user);

      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error({ msg: payload });
    },
  },
});

export const {logoutUser}=userSlice.actions;
export default userSlice.reducer;
