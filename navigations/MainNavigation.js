import { createStackNavigator } from "@react-navigation/stack";
import { OTP, Onboarding, PhoneRegister, ProfileCreate } from "../screens";
import BottomNavigation from "./BottomNavigation";
import SignIn from "../screens/auth/SignIn";
import Signup from "../screens/auth/Signup";
import { useEffect } from "react";
import { connectSocket, socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import NewFriendRequests from "../screens/main/NewFriendRequests";
// import Chat from "../screens/main/Chat";
import FriendList from "../screens/main/FriendList";
import Message from "../screens/main/Message";
import { fetchFriends } from "../core/features/chat";

const Stack = createStackNavigator();

const MainNavigation = () => {
  const { authenticated, user } = useSelector((state) => state.user);
  

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    if (user) {
      if (!socket) {
        connectSocket(user._id);
      }

      socket.on("new_friend_request", (data) => {
        console.log(data.message);
      });
      socket.on("request_accepted", (data) => {
        console.log(data.message);
      });
      socket.on("request_sent", (data) => {
        console.log(data.message);
      });
      socket.on("user_chats", (data)=>{
        console.log("user chats")
        dispatch(fetchFriends(data.chats));

      })

      // socket.on("new_message", (data) => {
      //   const message = data.message;

      //   if ( ?._id === data?.chat_id) {
      //     console.log("addmsg", current_conversation?._id === data?.chat_id)
      //     dispatch(AddMessage(message));
      //     console.log("dispatched")
      //   }
      // });
    }
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("new_message");
      socket?.off("user_chats")
    };
  }, [authenticated, socket]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!authenticated ? (
        <Stack.Group>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="PhoneRegister" component={PhoneRegister} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="ProfileCreate" component={ProfileCreate} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
          <Stack.Screen
            name="NewFriendRequests"
            component={NewFriendRequests}
          />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen name="FriendList" component={FriendList} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
