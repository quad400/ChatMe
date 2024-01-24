import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api";
import { prettylog } from "../utils";

const initialState = {
  direct_chat: {
    loading: false,
    conversations: [],
    current_conversation: null,
    current_messages: [],
    chat: [],
    chats: [],
    chat_id: null,
  },
  messagesList: [],
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setChatId: (state, action)=> {
      state.direct_chat.chat_id = action.payload
    },
    addMessageToList: (state, action) => {
      if (state.chat_id && state.chat_id === action.payload.chat_id) {
      const message = action.payload.msg;
      console.log("push: ", message)
      state.direct_chat.chat.push(message);
      }
      state.direct_chat.chat = [...state.direct_chat.chat];
    },
    fetchChat: (state, action) => {
      state.direct_chat.chat = action.payload;
    },

    fetchAllChatList: (state, action) => {
      state.direct_chat.chats = action.payload;
    },

    fetchChatMessages: (state, action) => {
      const messages = action.payload;
      state.direct_chat.chat = []
      // console.log("init: ",state.direct_chat.chat)
      state.direct_chat.loading = true
      // prettylog("fetch: ",messages)
      if (messages.length > 0) {
        const chat = messages.map((msg) => ({
          _id: msg?._id,
          text: msg?.text,
          createdAt: msg?.createdAt,
          file: msg?.file,
          type: msg?.type,
          user: {
            _id: msg?.user?._id,
            name: msg?.user?.username,
            avatar: msg?.user?.picture,
          },
        }));
        state.direct_chat.chat = chat
        // console.log("final: ",state.direct_chat.chat)
        state.direct_chat.loading = false
      } 
    },

    fetchDirectConversations: (state, action) => {
      const list = action.payload.conversations.map((el) => {
        const user = el.participants.find(
          (elm) => elm._id.toString() !== action.payload.user_id
        );
        return {
          id: el._id,
          user_id: user?._id,
          username: user?.username,
          message: el.message.slice(-1)[0].text,
          time: el.message.slice(-1)[0].createdAt,
        };
      });
      state.direct_chat.conversations = list;
    },

    addDirectConversation: (state, action) => {
      const this_conversation = action.payload.conversation;
      // const user = this_conversation.participants.find(
      //   (elm) => elm._id.toString() !== user_id
      // );
      state.direct_chat.conversations = state.direct_chat?.conversations
        ?.filter((el) => el?._id !== this_conversation._id)
        .push(this_conversation);
    },

    selectDirectConversation: (state, action) => {
      state.direct_chat.current_conversation = action.payload;
    },

    updateDirectConversation: (state, action) => {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (el) => {
          if (el?._id !== this_conversation._id) {
            return el;
          } else {
            return this_conversation;
          }
        }
      );
    },
  },
});
export default slice.reducer;

export const SetChatId = (chat_id) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setChatId(chat_id));
  };
};

export const AddMessageToList = ({ chat_id, msg }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addMessageToList({ chat_id, msg }));
  };
};

export const ResetMessages = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.resetMessages());
  };
};

export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversation({ conversation }));
  };
};

export const UpdateDirectConversation = ({ conversation }) => {
  return (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ conversation }));
  };
};

export const SelectDirectConversation = (current_conversation) => {
  return (dispatch, getState) => {
    dispatch(slice.actions.selectDirectConversation(current_conversation));
  };
};

export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    const user_id = await AsyncStorage.getItem("user_id");
    console.log("userId: ", user_id);

    dispatch(
      slice.actions.fetchDirectConversations({ conversations, user_id })
    );
  };
};

export const FetchConversationByUserId = (id) => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/chat/${id}`, config);
      dispatch(slice.actions.fetchConversationByUserId(response.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const FetchChat = (userId) => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/chat/${userId}`, config);
      dispatch(slice.actions.fetchChat(response.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const FetchAllChatList = () => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/chat/`, config);
      dispatch(slice.actions.fetchAllChatList(response.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const FetchChatMessages = (data) => {
  return (dispatch, _) => {
    dispatch(slice.actions.fetchChatMessages(data));
  };
};

export const AddMessage = (message) => {
  return (dispatch, _) => {
    console.log("add messages", message);
    dispatch(slice.actions.addMessage({ message }));
  };
};
