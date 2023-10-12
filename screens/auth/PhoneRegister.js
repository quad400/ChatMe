import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountryPicker } from "react-native-country-codes-picker";
import { Pressable } from "react-native";

const PhoneRegister = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+234");

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
        <View className="flex-row justify-center items-center mt-8">
          <TouchableOpacity
            onPress={() => setShow(true)}
            className="justify-center
         items-center bg-slate-100 h-12 w-15 rounded-md shadow-sm"
          >
            {/* <Image  /> */}
            <Text className="font-intermedium text-gray40 text-[12px] px-2">
              {countryCode}
            </Text>
          </TouchableOpacity>
          <View
            className="justify-center
         items-center bg-slate-100 h-12 w-4/5 ml-2 rounded-md shadow-sm"
          >
            <TextInput
              keyboardType="number-pad"
              cursorColor="#404040"
              placeholder="Phone Number"
              autoCorrect={false}
              className="font-interregular text-[12px] text-textColor bg-slate-100 w-full h-10 px-3"
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
      </View>
      <CountryPicker
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </SafeAreaView>
  );
};

export default PhoneRegister;
