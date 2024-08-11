// components/layout/SixPackGrid.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
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
				return styles.grid3x2;
			case '6x1':
				return styles.grid6x1;
			case '2x3':
				return styles.grid2x3;
			case '1x6':
				return styles.grid1x6;
			default:
				return styles.grid3x2;
		}
	};

	return (
		<View style={[styles.gridContainer, getGridStyle()]}>
			{instruments.map((instrument, index) => (
				<InstrumentCard key={index} {...instrument} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	gridContainer: {
		flex: 1,
		padding: 8,
		gap: 8,
	},
	grid3x2: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	grid6x1: {
		flexDirection: 'column',
	},
	grid2x3: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	grid1x6: {
		flexDirection: 'row',
	},
});