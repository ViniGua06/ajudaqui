import Input from "@/components/inputs";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
  return (
    <>
      <View style={{ height: "100%", alignItems: "center", gap: 30 }}>
        <View
          style={{
            width: "50%",
            height: "5%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("@/assets/images/icon.png")}
          ></Image>
        </View>
        <Input
          type="Text"
          height={40}
          width={"70%"}
          placeholder="Email"
          border={{ color: "black", width: 2, radius: 7 }}
          fontSize={15}
          boxShadow="rgba(0,0,0,.5) 2px 2px 2px"
          padding={{ inline: 2, block: 0 }}
          icons={{
            left: (
              <TouchableOpacity onPress={() => {}}>
                <MaterialCommunityIcons
                  size={20}
                  name="email-outline"
                  color={"black"}
                ></MaterialCommunityIcons>
              </TouchableOpacity>
            ),
          }}
          lineHeight={25}
        ></Input>
        <Input
          type="Password"
          height={40}
          width={"70%"}
          placeholder="Senha"
          border={{ color: "black", width: 2, radius: 7 }}
          fontSize={15}
          boxShadow="rgba(0,0,0,.5) 2px 2px 2px"
          padding={{ inline: 2, block: 0 }}
          icons={{
            left: (
              <TouchableOpacity onPress={() => {}}>
                <MaterialCommunityIcons
                  size={20}
                  name="security"
                  color={"black"}
                ></MaterialCommunityIcons>
              </TouchableOpacity>
            ),
          }}
          lineHeight={25}
        ></Input>
      </View>
    </>
  );
}
