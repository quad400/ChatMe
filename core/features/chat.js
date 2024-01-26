import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api";

const initialState = {
  messagesList: [],
  messagesNext: null,
  messagesUsername: null,
  messagesTyping: null,
  friends: [],
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    messageInfo: (state, action) => {
      state.messagesUsername = action.payload;
    },
    responseMessageList: (state, action) => {
      const data = action.payload;
      state.messagesList = [...data.messages];
    },

    updateMessageList: (state, action) => {
      const message = action.payload;
      state.messagesList = [...state.messagesList, message];
    },

    fetchFriends: (state, action) => {
      state.friends = action.payload;
    },

    updateFriendList: (state, action) => {
      const friend = action.payload;
      state.friends.filter((el) => {
        if (el._id === friend._id) {
          return;
        }
        return [friend, ...state.friends];
      });
    },
  },
});

export const {
  messageList,
  responseMessageList,
  fetchFriends,
  messageInfo,
  updateFriendList,
  updateMessageList,
} = slice.actions;
export default slice.reducer;
