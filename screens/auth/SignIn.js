import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputText, TextButton } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { BASE_URL } from "../../core/api";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, login } from "../../core/features/user";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const errorAlert = () => {
      if (alert) {
        setAlert(false);
        setAlertMessage(null);
      }
    };
    const interval = setInterval(errorAlert, 3000);
    return () => clearInterval(interval);
  }, [alert]);

  const handleSubmit = async () => {
    if (username === "" || password === "") {
      setAlert(true);
      setAlertMessage("Please fill in all inputs");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, {
        username,
        password,
      });
      await AsyncStorage.setItem("token", data?.token);
      await AsyncStorage.setItem("user_id", data?._id);
      dispatch(login(data));
      navigation.replace("BottomNavigation", {
        screen: "ChatHome",
      });
    } catch (error) {
      console.log(error.message);
      setAlert(true);
      setAlertMessage("Invalid login details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <KeyboardAwareScrollView>
        <View className="justify-center items-center mt-[50%] flex-1 flex-col">
          <Text className="font-interbold text-[22px] text-textColor">
            Login
          </Text>
          <Text className="font-interregular text-[10px] mx-10 text-center text-gray40 mt-2">
            Welcome back, fill in your login details
          </Text>
          {/* error msg */}
          {alert && (
            <Text className="text-red-600 text-center mt-2 text-[12px] font-interregular">
              {alertMessage}
            </Text>
          )}

          <View className="mx-8 my-4">
            {/* Username */}
            <View className="mt-2">
              <Text className="text-textColor text-[13px] font-interregular">
                Username
              </Text>
              <View className="flex-row h-12 w-full px-2 mt-2 items-center rounded-[15px] border border-gray-200">
                <TextInput
                  cursorColor="black"
                  placeholder="Username"
                  autoCorrect={false}
                  autoComplete="off"
                  value={username}
                  onChangeText={(e) => setUsername(e)}
                  autoCapitalize="none"
                  className={`text-[14px] w-[90%] font-intermedium outline-none`}
                />
              </View>
            </View>

            <InputText
              label="Password"
              placeholder="Enter your password"
              setValue={setPassword}
              value={password}
              isPassword={true}
            />
          </View>
          <TextButton
            label="Login"
            onPress={handleSubmit}
            isLoading={isLoading}
          />
          <View className="flex flex-row justify-center items-center mt-6">
            <Text className="text-[12px] font-interregular">
              Does not have an account ?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text className="text-primary text-[12px] font-interregular">
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
