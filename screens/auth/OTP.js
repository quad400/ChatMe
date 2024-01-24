import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import { COLORS, FONTS } from "../../constants/index";

const OTP = ({ navigation }) => {

  const [code, setCode] = useState("")

  if(code.length===4){
    console.log(code.length)
    navigation.navigate("ProfileCreate")
  }

  return (
    <SafeAreaView className="flex-1 bg-white h-full w-full mt-4 px-3">
      <Entypo
        name="chevron-small-left"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <View className="flex-1 w-full justify-center items-center">
        <Text className="font-interbold text-[22px] text-textColor">
          Enter Code
        </Text>
        <Text className="font-interregular text-[10px] mx-10 text-center text-gray40 mt-2">
          We have sent you an SMS with the code to +2348106490229
        </Text>
        <OtpInput
          numberOfDigits={4}
          focusColor={COLORS.textColor}
          focusStickBlinkingDuration={500}
          onTextChange={setCode}
          theme={{
            containerStyle: {
              width: "60%",
              marginTop: 30,
              marginBottom: 50,
            },
            pinCodeContainerStyle: {
              backgroundColor: "#40404005",
              borderWidth: 0,
            },

            pinCodeTextStyle: {
              color: "#404040",
              ...FONTS.Medium,
            },
          }}
        />
        <Pressable>
          <Text className="font-interregular text-[12px] text-primary">
            Resend Code
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OTP;
