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
			case '2x3':
				return 'flex-wrap flex-row'; // Grid style with wrapping
			case '6x1':
				return 'flex-col'; // Single column
			case '1x6':
				return 'flex-row'; // Single row
			default:
				return 'flex-wrap flex-row';
		}
	};

	return (
		<ScrollView contentContainerStyle="flex-1 p-2">
			<View className={`flex ${getGridStyle()} w-full h-full`}>
				{instruments.map((instrument, index) => (
					<View key={index} className={`flex-1 ${layout === '3x2' || layout === '2x3' ? 'w-1/3 h-1/3' : 'w-full h-full'} p-2`}>
						<InstrumentCard {...instrument} />
					</View>
				))}
			</View>
		</ScrollView>
	);
}