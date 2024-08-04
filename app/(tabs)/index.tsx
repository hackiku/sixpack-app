import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from 'nativewind';

export default function HomeScreen() {
	const { colorScheme, toggleColorScheme } = useColorScheme();
	const [altitude, setAltitude] = useState(1000); // Mock altitude
	const [coordinates, setCoordinates] = useState({ lat: 40.7128, lon: -74.0060 }); // Mock coordinates

	return (
		<View className={`flex-1 p-4 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
			{/* Dark mode toggle */}
			<TouchableOpacity
				onPress={toggleColorScheme}
				className="mb-4 p-2 bg-blue-500 rounded-lg self-start"
			>
				<Text className="text-white font-bold">
					Toggle {colorScheme === 'dark' ? 'Light' : 'Dark'} Mode
				</Text>
			</TouchableOpacity>

			{/* Altitude Card */}
			<View className={`mb-4 p-4 border-4 ${colorScheme === 'dark' ? 'border-white bg-gray-800' : 'border-black bg-white'}`}>
				<Text className={`text-2xl font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
					Altitude
				</Text>
				<Text className={`text-4xl font-mono ${colorScheme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
					{altitude} ft
				</Text>
			</View>

			{/* GPS Coordinates Card */}
			<View className={`p-4 border-4 ${colorScheme === 'dark' ? 'border-white bg-gray-800' : 'border-black bg-white'}`}>
				<Text className={`text-2xl font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
					GPS Coordinates
				</Text>
				<Text className={`text-xl font-mono ${colorScheme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
					Lat: {coordinates.lat.toFixed(4)}
				</Text>
				<Text className={`text-xl font-mono ${colorScheme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
					Lon: {coordinates.lon.toFixed(4)}
				</Text>
			</View>
		</View>
	);
}