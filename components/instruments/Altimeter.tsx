// components/Altimeter.tsx

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Barometer } from "expo-sensors";
import { useColorScheme } from "nativewind";

const Altimeter: React.FC = () => {
  const [pressure, setPressure] = useState<number | null>(null);
  const [altitude, setAltitude] = useState<number | null>(null);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    let subscription: ReturnType<typeof Barometer.addListener> | null = null;

    const startBarometer = async () => {
      const isAvailable = await Barometer.isAvailableAsync();
      if (isAvailable) {
        subscription = Barometer.addListener((data) => {
          const { pressure } = data;
          setPressure(pressure);

          // Calculate altitude
          const calculatedAltitude =
            44330 * (1 - Math.pow(pressure / 1013.25, 1 / 5.255));
          setAltitude(Math.round(calculatedAltitude));
        });
      } else {
        console.log("Barometer is not available on this device");
      }
    };

    startBarometer();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View
      className={`mb-4 p-4 border-2 rounded-lg ${
        colorScheme === "dark"
          ? "border-gray-300 bg-gray-800"
          : "border-gray-400 bg-white"
      }`}
    >
      <Text
        className={`text-lg font-bold ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Altimeter
      </Text>
      <View className="flex-row justify-between items-baseline">
        <Text
          className={`text-4xl font-semibold font-mono ${
            colorScheme === "dark" ? "text-green-400" : "text-green-600"
          }`}
        >
          {altitude !== null ? `${altitude}` : "N/A"} m
        </Text>
        <Text
          className={`text-2xl font-semibold font-mono ${
            colorScheme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {pressure !== null ? `${pressure.toFixed(2)}` : "N/A"} hPa
        </Text>
      </View>
    </View>
  );
};

export default Altimeter;
