import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Friend from "../../components/Friend";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserFriends } from "../../core/features/user";
import { connectSocket, socket } from "../../socket";
import {prettylog} from "../../core/utils"
import {
  AddDirectConversation,
  ResetMessages,
  SelectDirectConversation,
  UpdateDirectConversation,
} from "../../core/features/conversation";

const FriendList = () => {
  const { friends, user } = useSelector((state) => state.user);
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!user) return;
  //   if (!conversations) return;

  //   if (user) {
  //     if (!socket) {
  //       connectSocket(user?._id);
  //     }
  //     if (socket) {
  //       socket.on("start_chat", (data) => {
  //         // if (conversations !== undefined) {
  //           const conversation_exist = conversations?.find(
  //             (el) => el?._id === data?._id
  //           );

  //           console.log("conversation exist", conversation_exist)
  //           if (conversation_exist) {
  //             dispatch(UpdateDirectConversation({ conversation: data }));
  //           } else {
  //             dispatch(AddDirectConversation({ conversation: data }));
  //           }
  //           dispatch(SelectDirectConversation(data));
  //         // }
  //       });
  //       // dispatch(ResetMessages());
  //     }
  //     return () => {
  //       socket.off("start_chat");
  //     };
  //   }
  // }, [socket, conversations]);

  useEffect(() => {
    dispatch(getUserFriends());
  }, [dispatch]);

  if (!friends) return;

  // prettylog("friends: ",friends)

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <View className="m-3">
        <Text className="text-lg text-black font-interbold mb-3">Friends</Text>
        <View className="mt-3">
          {friends?.friends?.map((friend, index) => {
            // console.log("friend: ",friend)
            return <Friend key={index} friend={friend} />;
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FriendList;
