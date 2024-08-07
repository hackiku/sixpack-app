// components/layout/SixPackGrid.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import InstrumentCard from '@/components/instruments/InstrumentCard';

export default function SixPackGrid() {
	return (
		<ScrollView className="flex-1">
			<View className="p-2 space-y-4">
				<InstrumentCard title="Altitude" primaryData="12,500" secondaryData="ft" color="bg-[#F65A4D]" />
				<InstrumentCard title="Airspeed" primaryData="120" secondaryData="kts" color="bg-[#FFDB58]" />
				<InstrumentCard title="Vertical Speed" primaryData="+500" secondaryData="fpm" color="bg-[#A6FAFF]" />
				<InstrumentCard title="Heading" primaryData="218" secondaryData="SW" color="bg-[#AE7AFF]" />
				<InstrumentCard title="Turn Coordinator" primaryData="2" secondaryData="min" color="bg-[#FFA07A]" />
				<InstrumentCard title="Attitude" primaryData="5°" secondaryData="Pitch Up" color="bg-[#98FB98]" />
			</View>
		</ScrollView>
	);
}