// components/instruments/InstrumentCard.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

interface InstrumentCardProps {
	title: string;
	primaryData: string;
	secondaryData?: string;
	color: string;
}

export default function InstrumentCard({ title, primaryData, secondaryData, color }: InstrumentCardProps) {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === 'dark';

	// Determine if the asset should be visible based on the layout
	const isThreeColumns = false; // Update this based on your layout logic or props

	return (
		<View className={`flex-1 border-4 border-black rounded-lg ${color}`}>
			<View className="flex-1 flex-col justify-between space-y-2 p-2">
				<Text className={`text-lg font-bold ${isDark ? 'text-black' : 'text-black'}`}>{title}</Text>
				<View className="flex-1 flex-row gap-2 justify-start items-start">
					<Text className={`text-4xl font-bold ${isDark ? 'text-black' : 'text-black'}`}>{primaryData}</Text>
					{secondaryData && (
						<Text className={`text-lg ${isDark ? 'text-black' : 'text-gray-600'}`}>{secondaryData}</Text>
					)}
				</View>
				{!isThreeColumns && (
					<Text className={`text-xl ${isDark ? 'text-gray-700' : 'text-gray-600'}`}>Asset</Text>
				)}
			</View>
		</View>
	);
}