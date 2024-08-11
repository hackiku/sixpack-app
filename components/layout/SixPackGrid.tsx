// components/layout/SixPackGrid.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import InstrumentCard from '@/components/instruments/InstrumentCard';
import Controls from '@/components/ui/Controls';

const instruments = [
	{ title: "Altitude", primaryData: "12,500", secondaryData: "ft", color: "bg-[#F65A4D]" },
	{ title: "Airspeed", primaryData: "120", secondaryData: "kts", color: "bg-[#FFDB58]" },
	{ title: "Vertical Speed", primaryData: "+500", secondaryData: "fpm", color: "bg-[#A6FAFF]" },
	{ title: "Heading", primaryData: "218", secondaryData: "SW", color: "bg-[#AE7AFF]" },
	{ title: "Turn Coordinator", primaryData: "2", secondaryData: "min", color: "bg-[#FFA07A]" },
	{ title: "Attitude", primaryData: "5°", secondaryData: "Pitch Up", color: "bg-[#98FB98]" },
];

export default function SixPackGrid() {
	const [layout, setLayout] = useState('3x2');

	const getGridStyle = () => {
		switch (layout) {
			case '3x2':
				return 'grid-cols-2';
			case '6x1':
				return 'grid-cols-1';
			case '2x3':
				return 'grid-cols-3';
			case '1x6':
				return 'grid-cols-6';
			default:
				return 'grid-cols-2';
		}
	};

	return (
		<View className="flex-1">
			<View className={`p-2 grid ${getGridStyle()} gap-2`}>
				{instruments.map((instrument, index) => (
					<InstrumentCard key={index} {...instrument} />
				))}
			</View>
			<Controls onLayoutChange={setLayout} />
		</View>
	);
}