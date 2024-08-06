// components/Compass.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { useColorScheme } from "nativewind";

const Compass: React.FC = () => {
  const [heading, setHeading] = useState(0);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    let subscription: ReturnType<typeof Magnetometer.addListener>;

    Magnetometer.setUpdateInterval(100);

    subscription = Magnetometer.addListener(data => {
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      angle = (angle < 0 ? 360 + angle : angle);
      setHeading(Math.round(angle));
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  const getCardinalDirection = (angle: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(angle / 45) % 8];
  };

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
        Compass
      </Text>
      <View className="flex-row justify-between items-baseline">
        <Text
          className={`text-4xl font-semibold font-mono ${
            colorScheme === "dark" ? "text-green-400" : "text-green-600"
          }`}
        >
          {heading}°
        </Text>
        <Text
          className={`text-2xl font-semibold font-mono ${
            colorScheme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {getCardinalDirection(heading)}
        </Text>
      </View>
    </View>
  );
};

export default Compass;