// components/instruments/CatInstrumentCard.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

interface CatInstrumentCardProps {
	title: string;
	primaryData: string;
	secondaryData?: string;
	color: string;
}

export default function CatInstrumentCard({ title, primaryData, secondaryData, color }: CatInstrumentCardProps) {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === 'dark';

	return (
		<View className={`w-[48%] aspect-square mb-4 border-4 border-black rounded-lg ${color}`}>
			<View className="flex-1 flex-col justify-between p-2 space-y-2">
				<Text className={`text-lg font-bold ${isDark ? 'text-black' : 'text-black'}`}>{title}</Text>
				<View className="flex-1 flex-row items-end gap-2">
					<Text className={`font-bold text-4xl ${isDark ? 'text-black' : 'text-black'}`}>
						{primaryData}
					</Text>
					{secondaryData && (
						<Text className={`text-lg ${isDark ? 'text-black' : 'text-gray-600'}`}>{secondaryData}</Text>
					)}
				</View>
			</View>
		</View>
	);
}