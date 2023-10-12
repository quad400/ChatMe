import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { onboarding } from "../constants/images";

const Onboarding = ({navigation}) => {
  return (
    <View className="justify-center mt-30 items-center bg-white h-full w-full">
      <View className="justify-start items-center">
        <Image source={onboarding} resizeMode="contain" className="h-3/5" />

        <Text className="font-intermedium text-[18px] text-textColor text-center mt-5 px-20">
          Connect easily with your family and friends over countries
        </Text>
      </View>
      <View className="flex-1 bottom-10 w-full absolute">
        <Pressable className="mb-4">
          <Text className="font-interregular text-center text-gray50 text-[10px]">
            Terms & Privacy Policy
          </Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("PhoneRegister")} className="flex-row mx-10 justify-center items-center rounded-3xl bg-primary h-[50px]">
          <Text className="font-intersemibold text-white text-center">
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Onboarding;
