// components/layout/SixPackGrid.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import InstrumentCard from '@/components/instruments/InstrumentCard';

const instruments = [
	{ title: "Altitude", primaryData: "12,500", secondaryData: "ft", color: "bg-[#F65A4D]" },
	{ title: "Airspeed", primaryData: "120", secondaryData: "kts", color: "bg-[#FFDB58]" },
	{ title: "Vertical Speed", primaryData: "+500", secondaryData: "fpm", color: "bg-[#A6FAFF]" },
	{ title: "Heading", primaryData: "218", secondaryData: "SW", color: "bg-[#AE7AFF]" },
	{ title: "Turn Coordinator", primaryData: "2", secondaryData: "min", color: "bg-[#FFA07A]" },
	{ title: "Attitude", primaryData: "5°", secondaryData: "Pitch Up", color: "bg-[#98FB98]" },
];

export default function SixPackGrid({ layout }) {
	const getGridStyle = () => {
		switch (layout) {
			case '3x2':
				return 'flex-row flex-wrap'; // 3 rows, 2 columns
			case '6x1':
				return 'flex-col'; // 6 rows, 1 column
			case '2x3':
				return 'flex-row flex-wrap'; // 2 rows, 3 columns
			default:
				return 'flex-row flex-wrap'; // Default to 3 rows, 2 columns
		}
	};

	const getItemStyle = () => {
		switch (layout) {
			case '3x2':
				return 'w-1/2 h-1/3'; // 3 rows, 2 columns
			case '6x1':
				return 'w-full h-1/6'; // 6 rows, 1 column
			case '2x3':
				return 'w-1/3 h-1/2'; // 2 rows, 3 columns
			default:
				return 'w-1/2 h-2/3'; // Default to 3 rows, 2 columns
		}
	};

	return (
		<ScrollView contentContainerStyle="flex-1 ">
			<View className={`flex ${getGridStyle()} w-full h-full p-4`}>
				{instruments.map((instrument, index) => (
					<View key={index} className={`p-1 ${getItemStyle()}`}>
						<InstrumentCard {...instrument} />
					</View>
				))}
			</View>
		</ScrollView>
	);
}