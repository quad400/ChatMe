import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserFollow from "../../components/UserFollow";
import { getUsers } from "../../core/features/user";
import { useDispatch, useSelector } from "react-redux";

const UserToFollow = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers());
  },[dispatch]);

  const users = useSelector((state) => state.user.users);

  if(!users) return;

  return (
    <SafeAreaView className="bg-white p-3 w-full h-full">
      <Text className="text-lg font-intersemibold my-2">Users To Follow</Text>
      <View>
        {users.map((user) => (
          <UserFollow key={user._id} user={user} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default UserToFollow;
