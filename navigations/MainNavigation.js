import { createStackNavigator } from "@react-navigation/stack";
import { OTP, Onboarding, PhoneRegister, ProfileCreate } from "../screens";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="PhoneRegister" component={PhoneRegister} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ProfileCreate" component={ProfileCreate} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
