import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const InputText = ({
  placeholder,
  label,
  value,
  setValue,
  setGetEmailValidationStatus,
  isPassword = false,
  keyboardType = "default",
}) => {
  const [open, setOpen] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleChange = (value) => {
    // setValue(value);
    setValue(value);
    if (label === "Email") {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = re.test(value);
      setIsEmailValid(status);
      setGetEmailValidationStatus(status);
    }
  };

  return (
    <View className="mt-2">
      <Text className="text-textColor text-[13px] font-interregular">{label}</Text>
      <View
        className={`flex-row h-12 px-2 mt-2 items-center rounded-[15px] border ${
          (!isEmailValid && label === "Email" && value.length > 0) ||
          ((label === "Password" || label === "Confirm Password")  && (value.length != 0 && value.length < 6))
            ? "border-red-600 border"
            : "border-gray-100 border"
        } 
        items-center
       `}
      >
        <TextInput
          placeholder={placeholder}
          cursorColor="black"
          autoCapitalize="none"
          autoComplete="off"
          keyboardType={keyboardType}
          autoCorrect={false}
          value={value}
          secureTextEntry={!open}
          onChangeText={handleChange}
          className={`text-[14px] ${label === "Password" || label === "Confirm Password" ? "w-[95%]" : "w-full"} font-intermedium outline-none`}
        />

        {isPassword && (
          <Pressable onPress={() => setOpen(!open)} className="mr-3">
            <Feather
              name={`${open ? "eye" : "eye-off"}`}
              size={16}
              color="#6c6d83"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default InputText;
