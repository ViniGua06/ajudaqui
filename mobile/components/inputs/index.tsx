import {
  DimensionValue,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { ReactNode, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type InputType = {
  type: "Text" | "Password" | "Multiselect";
  width: DimensionValue;
  height: DimensionValue;
  padding?: { inline: number; block: number };
  placeholder?: string;
  boxShadow?: string;
  border: { width: number; color: string; radius: number };
  fontSize: number;
  icons?: {
    left?: ReactNode;
    right?: ReactNode;
  };
  lineHeight: number;
};

export default function Input(props: InputType) {
  const {
    type,
    width,
    height,
    padding,
    placeholder,
    boxShadow,
    border,
    fontSize,
    icons,
    lineHeight,
  } = props;

  const [visibleText, setVisibleText] = useState(
    type == "Password" ? false : true,
  );

  return type == "Text" || type == "Password" ? (
    <>
      <View
        style={{
          height,
          width,
          flexDirection: "row",
          paddingInline: padding?.inline,
          paddingBlock: padding?.block,
          borderWidth: border.width,
          borderColor: border.color,
          boxShadow,
          justifyContent: "space-evenly",
          alignItems: "center",

          borderRadius: border.radius,
        }}
      >
        {icons?.left ? (
          <View
            style={{
              height: "100%",
              width: "15%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icons.left}
          </View>
        ) : null}
        <TextInput
          secureTextEntry={!visibleText}
          placeholder={placeholder}
          multiline={false}
          numberOfLines={1}
          style={{
            includeFontPadding: false,
            paddingVertical: 0,
            textAlignVertical: "center",
            fontSize,

            flex: 1,
            lineHeight,
            width:
              icons?.left && icons.right
                ? "75%"
                : icons?.left || icons?.right
                  ? "85%"
                  : "100%",
          }}
        ></TextInput>
        {icons?.right && type != "Password" ? (
          <View style={{ height: "100%", width: "15%" }}>{icons.right}</View>
        ) : type == "Password" ? (
          <>
            <View
              style={{
                height: "100%",
                width: "10%",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => setVisibleText((crr) => !crr)}>
                <MaterialCommunityIcons
                  size={22}
                  name={visibleText ? "eye-off" : "eye"}
                ></MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>
    </>
  ) : null;
}
