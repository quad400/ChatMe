import { View, Text, Pressable, TextInput, LogBox } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

const ProfileCreate = ({navigation}) => {
  const [image, setImage] = useState(null);
  LogBox.ignoreLogs([
    'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
  ]);
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white h-full mt-4 px-3">
      <Pressable onPress={() => pickImage()}>
        <View className="relative">
          <View className="h-50 w-50 rounded-full bg-gray-50">
            {image ? (
              <Image source={{ uri: image }} resizeMode="contain" style={{height: 60, width: 60, borderRadius: 30}} />
            ) : (
              <AntDesign
                name="user"
                size={60}
                color="gray"
                style={{ margin: 10 }}
              />
            )}
          </View>
          <View className="bg-white rounded-full m-1 flex-1 justify-center h-4 w-4 items-center absolute bottom-0 right-0">
            <View className="bg-primary rounded-full p-0.5">
              <AntDesign name="plus" size={12} color="white" />
            </View>
          </View>
        </View>
      </Pressable>

      <Pressable
        onPress={() => navigation.replace("BottomNavigation")}
        className="flex-row w-4/5 mx-10 justify-center items-center rounded-3xl bg-primary h-[50px]"
      >
        <Text className="font-intersemibold text-white text-center">Save</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileCreate;
