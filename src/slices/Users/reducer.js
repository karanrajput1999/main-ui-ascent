import { createSlice } from "@reduxjs/toolkit";
import { getUsers, createUser, removeUser, updateUser } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  // editingUser: false, // if we press on edit user button this will be true
  users: [], // list of all users
  // currentUserId: null, // id of current user we editing / deleting
  alreadyRegisteredError: null, // if user with same email, mobile number already registered
  // roles: [], // list of all roles
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateAlreadyRegisteredError(state, action) {
      state.alreadyRegisteredError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.data.users;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log("payload while creating add ->", action.payload);

      state.users = [...state.users, action.payload.data];
      toast.success("User has been added !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    // builder.addCase(createUser.fulfilled, (state, action) => {
    //   state.users = [...state.users, action.payload];
    // });

    builder.addCase(removeUser.fulfilled, (state, action) => {
      const deletedUserId = action.payload.id;
      state.users = state.users.filter((user) => user.id !== deletedUserId);

      toast.error("User has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUserId = action.payload.id;
      state.users = state.users.map((user) => {
        if (user.id == updatedUserId) {
          user = action.payload;
          return user;
        } else {
          return user;
        }
      });

      toast.success("User details updated !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default usersSlice.reducer;