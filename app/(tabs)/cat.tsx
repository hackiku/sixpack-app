// app/(tabs)/cat.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { useColorScheme } from 'nativewind';
import BLEManager from '@/utils/BLEManager';
import CatInstrumentCard from '@/components/instruments/CatInstrumentCard';
import Controls from '@/components/ui/Controls';

const CatScreen: React.FC = () => {
	const { colorScheme } = useColorScheme();
	const [sensorData, setSensorData] = useState({
		roll: 'Not Connected',
		pitch: 'Not Connected',
		yaw: 'Not Connected',
		accel: 'Not Connected',
		gForce: 'Not Connected',
	});
	const [isConnected, setIsConnected] = useState(false);
	const [bleManager] = useState(() => new BLEManager());

	useEffect(() => {
		const initBLE = async () => {
			if (Platform.OS === 'ios' || Platform.OS === 'android') {
				try {
					await bleManager.startScanning();
					setIsConnected(true);
				} catch (error) {
					console.error('Failed to connect:', error);
					setIsConnected(false);
				}
			} else {
				console.log('BLE not supported on this platform, using mock data');
			}
		};

		initBLE();

		const updateInterval = setInterval(() => {
			const data = bleManager.getLatestData();
			setSensorData(data);
			setIsConnected(bleManager.isDeviceConnected());
		}, 100);

		return () => {
			clearInterval(updateInterval);
			bleManager.stopScanning();
		};
	}, []);

	return (
		<View className={`flex-1 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
			<ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
				<Text className={`text-2xl font-bold mb-4 ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
					{Platform.OS === 'ios' || Platform.OS === 'android'
						? (isConnected ? 'Connected to SixPack' : 'Not Connected')
						: 'BLE Not Supported (Mock Data)'}
				</Text>
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