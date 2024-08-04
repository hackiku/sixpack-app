// app/(tabs)/index.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
import Altimeter from "../../components/Altimeter";
import Gps from "../../components/Gps";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <ScrollView
      className={`flex-1 p-4 mt-12 ${colorScheme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <View className="p-4">
        <TouchableOpacity
          onPress={toggleColorScheme}
          className="mb-4 p-2 bg-blue-500 rounded-lg self-start"
        >
          <Text className="text-white font-bold">
            Toggle {colorScheme === "dark" ? "Light" : "Dark"} Mode
          </Text>
        </TouchableOpacity>

        <Altimeter />
        <Gps />
      </View>
    </ScrollView>
  );
}
