import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const [loaded] = useFonts({
    light: require("../assets/fonts/Poppins-Light.ttf"),
    regular: require("../assets/fonts/Poppins-Regular.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </SafeAreaView>
  );
}
