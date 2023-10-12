import { StatusBar } from 'expo-status-bar';
import { FONTS } from './constants';
import {useFonts} from "expo-font"
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigations/MainNavigation';


export default function App() {


  const [fontLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!fontLoaded) return null;

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>

    );
}
