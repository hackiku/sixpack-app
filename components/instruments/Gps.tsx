// components/Gps.tsx

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "nativewind";
import * as Location from "expo-location";

const Gps: React.FC = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View
      className={`mb-4 p-4 border-2 rounded-lg ${
        colorScheme === "dark" ? "border-gray-300 bg-gray-800" : "border-gray-400 bg-white"
      }`}
    >
      <Text
        className={`text-lg font-bold ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}
      >
        GPS Coordinates
      </Text>
      <View className="flex-row justify-between items-baseline">
        <Text
          className={`text-2xl font-semibold font-mono ${
            colorScheme === "dark" ? "text-green-400" : "text-green-600"
          }`}
        >
          {coordinates.latitude.toFixed(4)}° N
        </Text>
        <Text
          className={`text-2xl font-semibold font-mono ${
            colorScheme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {coordinates.longitude.toFixed(4)}° E
        </Text>
      </View>
    </View>
  );
};

export default Gps;
