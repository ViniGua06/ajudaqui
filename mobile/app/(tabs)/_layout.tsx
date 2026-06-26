import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            alignItems: "flex-end",
            paddingTop: 12,
            backgroundColor: "#8d12b3",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="planet-outline"
                size={size}
                color={color}
              ></Ionicons>
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="add"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color}></Ionicons>
            ),
          }}
        ></Tabs.Screen>
      </Tabs>
    </>
  );
}
