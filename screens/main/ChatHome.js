import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Friend from "../../components/Friend";

import { connectSocket, socket } from "../../socket";
import { fetchFriends, updateFriendList } from "../../core/features/chat";

const ChatHome = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { friends, chat_id } = useSelector((state) => state.chat);

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
        //     console.log("fetcher")

        socket.on("start_chat", (data) => {
          console.log("fetc", data);
          dispatch(updateFriendList(data));
        });
      }
    }
    return () => {
      socket?.off("start_chat");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    socket.emit("fetch_chats", { user_id: user?._id }, (data) => {
      console.log("fetc", data);
      dispatch(fetchFriends(data));
    });
  }, []);

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
            .map((friend) => {
              const chat_id = chat?._id;
              return (
                <Pressable
                  key={chat?._id}
                  onPress={() => {
                    navigation.navigate("Message", { friend, chat_id });
                  }}
                  className="flex-row justify-between items-center rounded-md my-2 p-2"
                >
                  <View className="flex-row justify-normal items-center">
                    <Image
                      source={{ uri: friend?.picture }}
                      className="h-[40px] w-[40px] rounded-full mr-3"
                    />
                    <View>
                      <Text className="text-[16px] font-intermedium">
                        {friend?.username}
                      </Text>
                      <Text>{chat.preview}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })
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
