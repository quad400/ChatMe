import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../core/features/user";
import { messages } from "../../constants/data";
import { connectSocket, socket } from "../../socket";
import {
  AddMessage,
  AddMessageToList,
  FetchChatMessages,
  SetChatId,
} from "../../core/features/conversation";
import { prettylog } from "../../core/utils";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { generateUniqueId } from "../../utils";

const Chat = ({ route }) => {
  const { friend } = route.params || {};
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { user, user_id } = useSelector((state) => state.user);
  const { chat, chat_id } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (user) {
      if (!socket) {
        connectSocket(user?._id);gg
      }
      socket.on("new_message", (data) => {
        const message = data?.message;
        // dispatch(AddMessageToList(data?.chat_id, message));
        setMessages([message, ...message].reverse());
      });
      socket.emit("start_conversation", { to: friend?._id, from: user_id });
    }

    return () => {
      socket?.off("new_message");
    };
  }, [socket, setMessages]);

  useEffect(() => {
    socket.emit(
      "get_messages",
      { to: user?._id, from: friend?._id },
      (data) => {
        prettylog("data from get messages", data);
        if (chat_id !== data?.chat_id) {
          dispatch(SetChatId(data.chat_id));
          console.log("worked");
          // dispatch(FetchChatMessages(data.messages));
          // setMessages([...chat].reverse());
        }
        setMessages([...data?.messages].reverse());
      }
    );
  }, [chat_id, setMessages]);

  const onSend = useCallback(
    (messages = []) => {
      console.log("chat id", chat_id);
      if (!chat_id) {
        const data = { to: friend?._id, from: user?._id };
        socket.emit("start_conversation", data);
      }
      const uniqueId = generateUniqueId();
      console.log(uniqueId);

      const messageSend = {
        _id: uniqueId,
        user: {
          _id: user?._id,
          name: user?.username,
          avatar: user?.picture,
        },
        message: msg,
      };

      const toSend = {
        chat_id: chat_id,
        _id: uniqueId,
        user: user,
        message: msg,
        type: "Text",
        from: user?._id,
        to: friend?._id,
      };

      console.log("to send ", toSend);
      console.log("message send ", messageSend);
      socket.emit("text_message", toSend);
      // dispatch(AddMessageToList({ chat_id, msg }));

      setMessages((previousMessages) =>
        GiftedChat.prepend(previousMessages, messages)
      );

      // setMessages([...chat].reverse());
      setMsg("");
    },
    [msg, chat]
  );

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome
            name="send"
            style={{ marginBottom: 10, marginRight: 10 }}
            size={25}
            color="orange"
            tvParallaxProperties={undefined}
          />
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView className="bg-white w-full h-full">
      {/* <KeyboardAvoidingView> */}
      <View className="flex-row m-3 items-center justify-between">
        <View className="flex-row justify-center items-center">
          <Image
            className="h-[40px] w-[40px] rounded-full"
            source={{ uri: friend?.picture }}
          />
          <View>
            <Text className="text-black text-lg font-intersemibold ml-3">
              {friend?.username}
            </Text>
            {/* {friend?.socket_id === typingUser && isTyping && (
              <Text>typing</Text>
            )} */}
          </View>
        </View>
        <View className="flex-row justify-center items-center space-x-2">
          <Ionicons name="ios-call" size={24} color={COLORS.gray55} />
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.gray55} />
        </View>
      </View>
      <GiftedChat
        messages={messages}
        text={msg}
        onInputTextChanged={(text) => setMsg(text)}
        onSend={(message) => onSend(message)}
        isTyping
        renderBubble={renderBubble}
        alwaysShowSend
        inverted={true}
        user={{
          _id: user?._id,
          name: user?.username,
          avatar: user?.picture,
        }}
        renderSend={renderSend}
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </SafeAreaView>
  );
};

function TextMessageMe({ message }) {
  return (
    <View className="w-full justify-end items-end mt-3">
      <View className="bg-gray-100 px-3 py-[7px] rounded-3xl flex-col float-right">
        <Text className="text-sm text-right text-gray90 font-interregular">
          {message}
        </Text>
      </View>
    </View>
  );
}
function TextMessageFriend({ message, friend }) {
  return (
    <View className="flex-row justify-start items-center space-x-2">
      <Image
        className="h-[30px] w-[30px] rounded-full"
        source={{ uri: friend?.picture }}
      />
      <View className="w-full justify-start items-start mt-3">
        <View className="bg-white border-1 border px-3 py-[7px] rounded-3xl border-gray-200">
          <Text className="text-sm text-gray90 font-interregular">
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Chat;
