import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigations/MainNavigation";
import { Provider } from "react-redux";
import { store } from "./core/store";
import Layout from "./screens/Layout";

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
    <Provider store={store}>
      <Layout>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </Layout>
    </Provider>
  );
}
