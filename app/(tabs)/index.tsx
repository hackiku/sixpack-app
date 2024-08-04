// app/(tabs)/index.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";

const InfoCard = ({ title, value, unit }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className={`mb-4 p-4 border-2 rounded-lg ${colorScheme === "dark" ? "border-gray-300 bg-gray-800" : "border-gray-400 bg-white"}`}
    >
      <Text
        className={`text-lg font-bold ${colorScheme === "dark" ? "text-white" : "text-black"}`}
      >
        {title}
      </Text>
      <Text
        className={`text-4xl font-semibold font-mono ${colorScheme === "dark" ? "text-green-400" : "text-green-600"}`}
      >
        {value} {unit}
      </Text>
    </View>
  );
};

const FlightModeSelector = () => {
  const { colorScheme } = useColorScheme();
  const [selectedMode, setSelectedMode] = useState("Manual");
  const modes = ["Manual", "Assisted", "Auto"];

  return (
    <View className="mb-4">
      <Text
        className={`text-lg font-bold mb-2 ${colorScheme === "dark" ? "text-white" : "text-black"}`}
      >
        Flight Mode
      </Text>
      <View className="flex-row justify-between">
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => setSelectedMode(mode)}
            className={`px-3 py-1 rounded-full ${
              selectedMode === mode
                ? colorScheme === "dark"
                  ? "bg-blue-600"
                  : "bg-blue-500"
                : colorScheme === "dark"
                  ? "bg-gray-700"
                  : "bg-gray-200"
            }`}
          >
            <Text
              className={`${selectedMode === mode ? "text-white" : colorScheme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [altitude, setAltitude] = useState(1000);
  const [coordinates, setCoordinates] = useState({
    lat: 40.7128,
    lon: -74.006,
  });

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

        <InfoCard title="Altitude" value={altitude} unit="ft" />
        <InfoCard
          title="Latitude"
          value={coordinates.lat.toFixed(4)}
          unit="°"
        />
        <InfoCard
          title="Longitude"
          value={coordinates.lon.toFixed(4)}
          unit="°"
        />
        <FlightModeSelector />
      </View>
    </ScrollView>
  );
}
