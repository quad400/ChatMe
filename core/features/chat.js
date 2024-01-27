import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api";
import { socket } from "../../socket";

const initialState = {
  chat_id: null,
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

    resetMessageList: (state, action) => {
      state.messagesList = [];
      state.chat_id = null;
    },

    responseMessageList: (state, action) => {
      state.messagesList = [...action.payload.message];
    },

    updateMessageList: (state, action) => {
      const message = action.payload;
      state.messagesList = [...state.messagesList, message];
    },

    fetchFriends: (state, action) => {
      state.friends = action.payload;
    },

    storeChatId: (state, action) => {
      state.chat_id = action.payload;
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

export const ResponseMessageList = ({ inputData }) => {
  return (dispatch, getState) => {
    console.log("running");
    dispatch(slice.actions.resetMessageList());
    socket.emit("get_messages", { inputData }, (data) => {
      console.log("getter",data.chat_id);
      dispatch(slice.actions.storeChatId(data.chat_id));
      dispatch(responseMessageList({ message: data.messages }));
    });
  };
};
