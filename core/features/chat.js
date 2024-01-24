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

    fetchFriends: (state, action) => {
      state.friends = action.payload;
    },

    updateFriendList: (state, action) => {
      const friend = action.payload;
      state.friends.push(friend);
    },
  },
});

export const {
  messageList,
  responseMessageList,
  fetchFriends,
  messageInfo,
  updateFriendList,
} = slice.actions;
export default slice.reducer;
