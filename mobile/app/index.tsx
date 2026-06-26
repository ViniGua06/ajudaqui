import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuthStore } from "@/store/store";
import { useEffect } from "react";

export default function Index() {
  const setUserId = useAuthStore((state) => state.setUserId);
  const seeIfUserIsLogged = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      router.replace("/sign-in");
      return;
    }

    setUserId(userId);

    router.replace("/(tabs)");
    return;
  };

  useEffect(() => {
    seeIfUserIsLogged();
  }, []);

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"#8d12b3"} size={100}></ActivityIndicator>
      </View>
    </>
  );
}
