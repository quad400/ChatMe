import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Friend from "../../components/Friend";
import {
  AddDirectConversation,
  FetchAllChatList,
  FetchDirectConversations,
  SelectDirectConversation,
  UpdateDirectConversation,
} from "../../core/features/conversation";
import { connectSocket, socket } from "../../socket";
import { fetchFriends } from "../../core/features/chat";

const ChatHome = ({ navigation }) => {
  const { user, user_id } = useSelector((state) => state.user);
  const { friends } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  // if(!conversations) return;

  useEffect(() => {
    // dispatch(FetchAllChatList());
    if (!user) return;

    if (user) {
      if (!socket) {
        connectSocket(user?._id);
      }
      if (socket) {
        socket.on("user_chats", (data) => {
          console.log("user chat");
          dispatch(fetchFriends(data.chats));
        });
      }
    }

    return () => {
      socket?.off("user_chats");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    // dispatch(FetchAllChatList());
    if (!user) return;

    if (user) {
      if (!socket) {
        connectSocket(user?._id);
      }
      if (socket) {
        //     console.log("fetcher")
        socket.emit("fetch_chats", { user_id: user?._id }, (data) => {
          console.log("fetc", data);
          dispatch(fetchFriends(data));
        });
      }
    }
  }, [socket, dispatch]);

  // console.log(friends);
  return (
    <SafeAreaView className="bg-white px-3 w-full h-full">
      {/* Top */}
      <View className="flex flex-row justify-between mt-2 items-center">
        <Text className="font-intermedium text-[18px] text-gra90">
          Hi, {user?.username}
        </Text>
        <Ionicons
          name="notifications-outline"
          size={30}
          color="black"
          onPress={() => navigation.navigate("NewFriendRequests")}
        />
      </View>

      <View className="bg-gray-50 rounded-md my-3 px-3 py-1 flex flex-row justify-start items-center">
        <AntDesign name="search1" size={18} color={COLORS.gray40} />
        <TextInput
          placeholder="Search"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          className="font-interregular text-[12px] w-full h-8 ml-2"
          cursorColor={COLORS.textColor}
        />
      </View>

      <View className="mt-3">
        {friends?.flatMap((chat) =>
          chat.participants
            .filter((participant) => participant._id !== user?._id)
            .map((participant) => (
              <Friend
                key={participant?._id}
                friend={participant}
                chat_id={chat._id}
              />
            ))
        )}
      </View>

      <View className="absolute bottom-3 right-4">
        <View className="bg-primary rounded-full h-[40px] w-[40px] justify-center items-center">
          <AntDesign
            name="plus"
            size={30}
            color="white"
            onPress={() => navigation.navigate("FriendList")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatHome;
