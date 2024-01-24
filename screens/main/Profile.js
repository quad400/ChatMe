import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import * as ImagePicker from "expo-image-picker"
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../core/features/user";



const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()

  const pickImage = async () => {
    console.log("pressed")
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // uploadThumbnail(result.assets[0]);
    }
  }

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="m-3">
        {user?.picture === null ? (
          <Image
            source={require("../../assets/images/profile.png")}
            resizeMode="cover"
            className="w-[30px] h-[30px]"
            style={{
              tintColor: COLORS.gray65,
            }}
          />
        ) : (
          <Image
            source={{ uri: user?.picture }}
            resizeMode="cover"
            className="w-[40px] h-[40px] rounded-full"
            style={{
              // tintColor: COLORS.gray65,
            }}
          />
        )}
      </View>
      <View className="justify-center items-center w-full flex-1">
        <Pressable className="rounded-full" onPress={pickImage}
          style={{
            height: 110,
            width: 110,
            borderRadius: 55,
            borderColor: user?.picture === null ? "white" : COLORS.gray85,
            borderWidth: user?.picture === null ? 2 : 0,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user?.picture === null ? (
            <Image
              source={require("../../assets/images/profile.png")}
              resizeMode="cover"
              style={{
                tintColor: COLORS.gray65,
                height: 100,
                width: 100,
              }}
            />
          ) : (
            <Image
              source={{ uri: user?.picture }}
              resizeMode="cover"
              style={{
                borderRadius: 50,
                height: 100,
                width: 100,
              }}
            />
          )}
          </Pressable>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginVertical: 5,
              color: COLORS.textColor,
              fontSize: 20,
              ...FONTS.Bold,
            }}
          >
            {user?.email}
          </Text>
          <Text
            style={{
              color: COLORS.gray50,
              fontSize: 14,
              ...FONTS.Medium,
            }}
          >
            @{user?.username}
          </Text>
        </View>

        <Pressable
          onPress={() => dispatch(logout())}
          className="justify-center flex-row space-x-2 items-center w-2/5 rounded-3xl mt-5 bg-primary h-[50px]"
        >
          <MaterialIcons name="logout" size={24} color="white" />
          <Text className="text-white font-intermedium text-[14px]">
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
