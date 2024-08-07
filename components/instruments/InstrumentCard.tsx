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

	return (
		<View className={`w-full aspect-[16/9] p-4 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
			<View
				className={`flex-1 border-4 border-black rounded-lg p-4 ${color}`}
			>
				<Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>{title}</Text>
				

				<View className="flex-1 flex-row items-start justify-between">
					<View className="flex-1 justify-center items-center">
						<Text className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{primaryData}</Text>
						{secondaryData && (
							<Text className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{secondaryData}</Text>
						)}
					</View>
						<Text>Asset</Text>
				</View>


			</View>
		</View>
	);
}