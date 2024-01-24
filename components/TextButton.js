import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";

const TextButton = ({ label, onPress, isLoading }) => {
  return (
    <Pressable
      className={`flex-row w-4/5 mx-10 justify-center items-center rounded-3xl h-[50px] ${
        isLoading ? "bg-[#0a8c7780]" : "bg-primary"
      }`}
      onPress={onPress}
      disabled={isLoading}
    >

      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
        ) : (
        <Text className="font-intermedium text-white text-center text-[14px] py-2">
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default TextButton;
