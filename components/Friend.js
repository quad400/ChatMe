import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { updateFriendList } from "../core/features/chat";
// import { FetchChatById } from "../core/features/conversation";

const Friend = ({ friend, chat_id }) => {
  const { user_id } = useSelector((state) => state.user);
  const id = friend?._id;
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Message", {friend,chat_id});
      }}
      className="flex-row justify-between items-center rounded-md my-2 p-2"
    >
      <View className="flex-row justify-normal items-center">
        <Image
          source={{ uri: friend?.picture }}
          className="h-[40px] w-[40px] rounded-full mr-3"
        />
        <View>

        <Text className="text-[16px] font-intermedium">{friend?.username}</Text>
        {}
        </View>
      </View>
    </Pressable>
  );
};

export default Friend;
