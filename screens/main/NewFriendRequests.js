
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserRequest } from "../../core/features/user";
import { useDispatch, useSelector } from "react-redux";
import Request from "../../components/Request"

const NewFriendRequests = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserRequest());
  },[dispatch]);

  const friend_requests = useSelector((state) => state.user.friend_requests);

  if(!friend_requests) return;

  return (
    <SafeAreaView className="bg-white p-3 w-full h-full">
      <Text className="text-lg font-intersemibold my-2">Friend Requests</Text>
      <View>
        {friend_requests.map((user) => (
          <Request key={user._id} {...user} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default NewFriendRequests;
