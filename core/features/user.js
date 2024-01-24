import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { BASE_URL } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const initialState = {
  authenticated: false,
  user_id: null,
  token: null,
  user: null,
  user_by_id: null,
  users: [],

  friend_requests:[],
  friends: []
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.token = action.payload.token;
      state.user_id = action.payload._id;
      state.user = action.payload;
    },
    logout: (state, _) => {
      (state.token = null), (state.authenticated = false);
    },
    userDetail: (state, action) => {
      state.authenticated = true;
      state.user = action.payload;
      state.user_id = action.payload._id
    },
    getNotFriendUsers: (state, action) => {
      state.users = action.payload;
    },
    getFriendRequest: (state, action)=> {
      state.friend_requests = action.payload
    },
    getFriends: (state, action)=> {
      state.friends = action.payload
    },
    getById: (state, action)=> {
      state.user_by_id = action.payload
    }
  },
});

export const { login, userDetail, logout } = slice.actions;

export default slice.reducer;

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);
    if (!token) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/user`, config);
      console.log("det", response.data);
      dispatch(userDetail(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getUsers = () => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      
      const response = await axios.get(`${BASE_URL}/user/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      dispatch(
        slice.actions.getNotFriendUsers(response.data.data)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getUserRequest = ()=> {
  return async (dispatch, getState)=> {
    try {
      const token = await AsyncStorage.getItem("token");
      
      const response = await axios.get(`${BASE_URL}/user/friend-request`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      dispatch(
        slice.actions.getFriendRequest(response.data.data)
      );
    } catch (error) {
      console.log(error.message);

    }
  }
}

export const getUserFriends = ()=> {
  return async (dispatch, getState)=> {
    try {
      const token = await AsyncStorage.getItem("token");
      
      const response = await axios.get(`${BASE_URL}/user/friends`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        slice.actions.getFriends(response.data.data)
      );
    } catch (error) {
      console.log(error.message);

    }
  }
}

export const getUserById = (id)=> {
  return async (dispatch, getState)=> {
    try{
      const response = await axios.get(`${BASE_URL}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(
        slice.actions.getById(response.data.data)
      );
    }catch(error){

    }
  }
}
