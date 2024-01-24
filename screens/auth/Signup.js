import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputText, TextButton } from "../../components";
import api from "../../core/api";

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const login = useGlobal((state) => state.login);

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
    if (
      username === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      confirmPassword === ""
    ) {
      setAlert(true);
      setAlertMessage("Please fill in all inputs");
      return;
    }
    if (password !== confirmPassword) {
      setAlert(true);
      setAlertMessage("Password Mismatch");
      return;
    }

    if (password < 7) {
      setAlert(true);
      setAlertMessage("Password must be over 7 letters or numbers");
      return;
    }

    setIsLoading(true);
    await api({
      method: "POST",
      url: "/chat/signup/",
      data: {
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: password,
      },
    })
      .then((response) => {
        console.log(response.data)
        // login(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        setAlert(true);
        setAlertMessage("user with this username already exist");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <KeyboardAwareScrollView>
        <View className="justify-center items-center mt-[10%] flex-1 flex-col">
          <Text className="font-interbold text-[22px] text-textColor">
            Register
          </Text>
          <Text className="font-interregular text-[10px] mx-10 text-center text-gray40 mt-2">
            Get Started to chat on Chat me.
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
            <View className="mt-2">
              <Text className="text-textColor text-[13px] font-interregular">
                First Name
              </Text>
              <View className="flex-row h-12 w-full px-2 mt-2 items-center rounded-[15px] border border-gray-200">
                <TextInput
                  cursorColor="black"
                  placeholder="First Name"
                  autoCorrect={false}
                  autoComplete="off"
                  value={firstName}
                  onChangeText={(e) => setFirstName(e)}
                  autoCapitalize="none"
                  className={`text-[14px] w-[90%] font-intermedium outline-none`}
                />
              </View>
            </View>
            <View className="mt-2">
              <Text className="text-textColor text-[13px] font-interregular">
                Last Name
              </Text>
              <View className="flex-row h-12 w-full px-2 mt-2 items-center rounded-[15px] border border-gray-200">
                <TextInput
                  cursorColor="black"
                  placeholder="Last Name"
                  autoCorrect={false}
                  autoComplete="off"
                  value={lastName}
                  onChangeText={(e) => setLastName(e)}
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

            <InputText
              label="Confirm Password"
              placeholder="Enter your password"
              setValue={setConfirmPassword}
              value={confirmPassword}
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
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text className="text-primary text-[12px] font-interregular">
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;
