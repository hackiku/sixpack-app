// app/(tabs)/cat.tsx
// This file contains the Cat screen component, which displays sensor data from the Arduino via BLE

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'nativewind';
import BLEManager from '@/utils/BLEManager';
import CatInstrumentCard from '@/components/instruments/CatInstrumentCard';
import Controls from '@/components/ui/Controls';

const CatScreen: React.FC = () => {
	const { colorScheme } = useColorScheme();
	const [sensorData, setSensorData] = useState({
		roll: 'N/A',
		pitch: 'N/A',
		yaw: 'N/A',
		accel: 'N/A',
		gForce: 'N/A',
	});
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let bleManager: BLEManager | null = null;
		let updateInterval: NodeJS.Timeout | null = null;

		const initBLE = async () => {
			try {
				bleManager = new BLEManager();
				await bleManager.startScanning();

				updateInterval = setInterval(() => {
					const data = bleManager?.getLatestData();
					if (data) {
						setSensorData(data);
					}
				}, 100);
			} catch (err) {
				console.error('BLE Error:', err);
				setError('Failed to initialize BLE. Please check your device settings.');
			}
		};

		initBLE();

		return () => {
			if (updateInterval) clearInterval(updateInterval);
			if (bleManager) bleManager.stopScanning();
		};
	}, []);

	if (error) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-red-500">{error}</Text>
			</View>
		);
	}

	return (
		<View className={`flex-1 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
			<ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
				<View className="flex-row flex-wrap justify-between">
					<CatInstrumentCard title="Roll" primaryData={sensorData.roll} secondaryData="°" color="bg-[#F65A4D]" />
					<CatInstrumentCard title="Pitch" primaryData={sensorData.pitch} secondaryData="°" color="bg-[#FFDB58]" />
					<CatInstrumentCard title="Yaw" primaryData={sensorData.yaw} secondaryData="°" color="bg-[#A6FAFF]" />
					<CatInstrumentCard title="Accel" primaryData={sensorData.accel} secondaryData="m/s²" color="bg-[#AE7AFF]" />
					<CatInstrumentCard title="G-Force" primaryData={sensorData.gForce} secondaryData="G" color="bg-[#98FB98]" />
				</View>
			</ScrollView>
			<View className="absolute left-1/4 bottom-2">
				<Controls onLayoutChange={() => { }} show3D={false} toggleShow3D={() => { }} />
			</View>
		</View>
	);
};

export default CatScreen;