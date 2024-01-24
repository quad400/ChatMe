import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { socket } from "../socket";
import { useSelector } from "react-redux";

const UserFollow = ({ user }) => {
  const user_id = useSelector((state) => state.user.user_id);

  return (
    <>
      <View className="flex-row justify-between items-center rounded-md my-2 p-2">
        <View className="flex-row justify-normal items-center">
          <Image
            source={{ uri: user?.picture }}
            className="h-[40px] w-[40px] rounded-full mr-3"
          />
          <Text className="text-[16px] font-intermedium">{user?.username}</Text>
        </View>
        {/* <MaterialIcons
          name="connect-without-contact"
          size={30}
          color={COLORS.primary}
          onPress={() => socket.emit("friend_request", {to: user._id, from: user_id}, ()=> {
            console.log("request sent")
          })}
        /> */}

        <Pressable
          className="bg-black p-2 border-black rounded-md"
          onPress={() => {
            console.log("click start")
            socket.emit("friend_request", { to: user._id, from: user_id }, () => {
              console.log("request sent");
            });
            console.log("click end")
          }}
        >
          <Text className="text-white text-sm font-intermedium">Send Request</Text>
        </Pressable>
      </View>
      <View className="h-[1px] w-full bg-gray-200" />
    </>
  );
};

export default UserFollow;
