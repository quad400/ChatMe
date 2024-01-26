import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  Platform,
  InputAccessoryView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { connectSocket, socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {
  messageInfo,
  messageList,
  responseMessageList,
  updateFriendList,
  updateMessageList,
} from "../../core/features/chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { generateUniqueId } from "../../utils";

function MessageBubble({ index, message, friend }) {
  const [showTyping, setShowTyping] = useState(false);
  const { messagesTyping } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (index !== 0) return;
    if (messagesTyping === null) {
      setShowTyping(false);
      return;
    }
    setShowTyping(true);
    const check = setInterval(() => {
      const now = new Date();
      const ms = now - messagesTyping;
      if (ms > 10000) {
        setShowTyping(false);
      }
    }, 1000);
    return () => clearInterval(check);
  }, [messagesTyping]);

  //   console.log(message);

  // if (index === 0) {
  //   if (showTyping) {
  //     return (
  //       <MessageBubbleFriend key={message} friend={friend} typing={true} />
  //     );
  //   }
  //   return;
  // }

  return message.user?._id === user?._id ? (
    <MessageBubbleMe key={message._id} text={message.text} />
  ) : (
    <MessageBubbleFriend
      key={message._id}
      text={message.text}
      friend={friend}
    />
  );
}

function MessageBubbleFriend({ text = "", friend, typing = false }) {
  //   console.log(friend?.picture);
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 4,
        paddingLeft: 16,
      }}
    >
      <Image
        source={{ uri: friend?.picture }}
        className="h-10 w-10 rounded-full"
      />
      <View
        style={{
          backgroundColor: "#d0d2db",
          borderRadius: 21,
          maxWidth: "75%",
          paddingHorizontal: 16,
          paddingVertical: 12,
          justifyContent: "center",
          marginLeft: 8,
          minHeight: 42,
        }}
      >
        {typing ? (
          <View style={{ flexDirection: "row" }}>
            <MessageTypingAnimation offset={0} />
            <MessageTypingAnimation offset={1} />
            <MessageTypingAnimation offset={2} />
          </View>
        ) : (
          <Text
            style={{
              color: "#202020",
              fontSize: 16,
              lineHeight: 18,
            }}
          >
            {text}
          </Text>
        )}
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
}

function MessageTypingAnimation({ offset }) {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const total = 1000;
    const bump = 200;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(bump * offset),
        Animated.timing(y, {
          toValue: 1,
          duration: bump,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: bump,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(total - bump * 2 - bump * offset),
      ])
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, []);

  const translateY = y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        marginHorizontal: 1.5,
        borderRadius: 4,
        backgroundColor: "#606060",
        transform: [{ translateY }],
      }}
    />
  );
}

function MessageBubbleMe({ text }) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 4,
        paddingRight: 12,
      }}
    >
      <View style={{ flex: 1 }} />
      <View
        style={{
          backgroundColor: "#303040",
          borderRadius: 21,
          maxWidth: "75%",
          paddingHorizontal: 16,
          paddingVertical: 12,
          justifyContent: "center",
          marginRight: 8,
          minHeight: 42,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            lineHeight: 18,
          }}
        >
          {text} 
        </Text>
      </View>
    </View>
  );
}

function MessageInput({ message, setMessage, onSend }) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="Message..."
        placeholderTextColor="#909090"
        value={message}
        onChangeText={setMessage}
        style={{
          flex: 1,
          paddingHorizontal: 18,
          borderWidth: 1,
          borderRadius: 25,
          borderColor: "#d0d0d0",
          backgroundColor: "white",
          height: 50,
        }}
      />
      <TouchableOpacity onPress={onSend}>
        <FontAwesome
          name="paper-plane"
          size={22}
          color={"#303040"}
          style={{
            marginHorizontal: 12,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const Message = ({ route }) => {
  const { friend } = route.params;
  const [chat_id, setChat_id] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const { messagesList, friends } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  // console.log(messagesList)

  useEffect(() => {
    console.log("want to run");
    socket.emit(
      "start_conversation",
      { from: user?._id, to: friend?._id },
      (chat) => {
        dispatch(updateFriendList(chat));
      }
    );
  }, [socket]);

  useEffect(() => {
    if (!user) return;

    if (user) {
      if (!socket) {
        connectSocket();
      }
      dispatch(messageInfo(friend?.username));

      socket.on("new_message", (data) => {
        dispatch(updateMessageList(data.message));
        // console.log(data)
      });

      const inputData = { from: user?._id, to: friend?._id };
      if (chat_id === null) {
        socket.emit("get_messages", { inputData }, (data) => {
          setChat_id(data?.chat_id);
          dispatch(responseMessageList(data));
        });
      }
    }
    return () => {
      socket?.off("new_message");
    };
  }, []);

  console.log(chat_id);
  function onSend() {
    const uniqueId = generateUniqueId();
    const toSend = {
      chat_id: chat_id,
      _id: uniqueId,
      user: user,
      message: message,
      type: "Text",
      from: user?._id,
      to: friend?._id,
    };
    socket.emit("text_message", { toSend });
    setMessage("");

    const friendIndex = friends.findIndex(
      (item) => item.friend.username === username
    );
    if (friendIndex >= 0) {
      const item = friendList[friendIndex];
      item.preview = data.message.text;
      item.updated = data.message.created;
      friendList.splice(friendIndex, 1);
      friendList.unshift(item);
      set((state) => ({
        friendList: friendList,
      }));
    }
  }

  function onType(value) {
    setMessage(value);
    // messageType(friend.username);
  }

  return (
    <SafeAreaView className="bg-white w-full h-full">
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
          </View>
        </View>
        <View className="flex-row justify-center items-center space-x-2">
          <Ionicons name="ios-call" size={24} color={COLORS.gray55} />
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.gray55} />
        </View>
      </View>
      <FlatList
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          paddingTop: 30,
        }}
        data={[...messagesList].reverse()}
        inverted={true}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <MessageBubble
            key={item?._id}
            index={index}
            message={item}
            friend={friend}
          />
        )}
      />
      {Platform.OS === "ios" ? (
        <InputAccessoryView>
          <MessageInput message={message} setMessage={onType} onSend={onSend} />
        </InputAccessoryView>
      ) : (
        <MessageInput message={message} setMessage={onType} onSend={onSend} />
      )}
    </SafeAreaView>
  );
};

export default Message;
