import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountryPicker } from "react-native-country-codes-picker";
import { Pressable } from "react-native";

const PhoneRegister = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+234");
  const [flag, setFlag] = useState(null);

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
          Enter Your Phone Number
        </Text>
        <Text className="font-interregular text-[10px] mx-10 text-center text-gray40 mt-2">
          Please confirm your country code and enter your phone number
        </Text>
        <View className="flex-row justify-center items-center w-4/5 mt-8">
          <TouchableOpacity
            onPress={() => setShow(true)}
            className="flex-row justify-center
         items-center bg-gray-50 h-12 px-2 rounded-md"
          >
            <Text>{flag}</Text>

            <Text className="font-interregular text-textColor text-[12px] pl-1">
              {countryCode}
            </Text>
          </TouchableOpacity>
          <View
            className="justify-center
         items-center bg-gray-50 h-12 w-full ml-2 rounded-md"
          >
            <TextInput
              keyboardType="number-pad"
              cursorColor="#404040"
              placeholder="Phone Number"
              autoCorrect={false}
              className="font-interregular text-[12px] text-textColor bg-gray-50 w-full h-10 px-3"
            />
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate("OTP")}
          className="flex-row w-4/5 mx-10 mt-10 justify-center items-center rounded-3xl bg-primary h-[50px]"
        >
          <Text className="font-intersemibold text-white text-center">
            Continue
          </Text>
        </Pressable>
      <CountryPicker
        show={show}
        onBackdropPress={() => setShow(false)}
        pickerButtonOnPress={(item) => {
          setFlag(item.flag);
          setCountryCode(item.dial_code);
          setShow(false);
        }}
        style={{

          modal: {
            height: 300,
          },
          flag: {
            height: 20,
            width: 20,
          },
          textInput: {
            fontFamily: "InterRegular",
          },
        }}
      />
      </View>
    </SafeAreaView>
  );
};

export default PhoneRegister;
