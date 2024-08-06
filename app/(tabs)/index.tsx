// app/(tabs)/index.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
import Altimeter from "../../components/instruments/Altimeter";
// import Altimeter from "@/components/instruments/Altimeter";
import Gps from "../../components/instruments/Gps";
import Compass from "../../components/instruments/Compass";
// import ThreeModel from "../../components/ThreeModel";
import ThreeDScene from "../../components/3d/ThreeDScene";

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

				{/* instruments */}
        <Altimeter />
        <Gps />
        <Compass />

				<View style={{ height: 300, marginTop: 20 }}>
					{/* <ThreeModel /> */}
					<ThreeDScene />
					<Text className="text-red-500">
						threemodel
					</Text>
				</View>


      </View>
    </ScrollView>
  );
}
