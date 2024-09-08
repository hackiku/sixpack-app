// app/(tabs)/cat.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useColorScheme } from 'nativewind';
import BLEManager from '@/utils/BLEManager';
import CatInstrumentCard from '@/components/instruments/CatInstrumentCard';
import Controls from '@/components/ui/Controls';
import { Device } from 'react-native-ble-plx';

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
	const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
	const [isScanning, setIsScanning] = useState(false);

	useEffect(() => {
		const updateInterval = setInterval(() => {
			if (isConnected) {
				const data = bleManager.getLatestData();
				setSensorData(data);
			}
		}, 100);

		return () => {
			clearInterval(updateInterval);
			bleManager.disconnect();
		};
	}, [isConnected]);

	const scanForDevices = async () => {
		setIsScanning(true);
		try {
			const devices = await bleManager.scanForDevices();
			setAvailableDevices(devices);
		} catch (error) {
			console.error('Failed to scan for devices:', error);
		} finally {
			setIsScanning(false);
		}
	};

	const connectToDevice = async (device: Device) => {
		try {
			await bleManager.connectToDevice(device);
			setIsConnected(true);
		} catch (error) {
			console.error('Failed to connect to device:', error);
		}
	};

	return (
		<View className={`flex-1 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
			<ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
				<TouchableOpacity
					onPress={scanForDevices}
					className="bg-blue-500 p-2 rounded mb-4"
				>
					<Text className="text-white text-center">
						{isScanning ? 'Scanning...' : 'Scan for Devices'}
					</Text>
				</TouchableOpacity>

				{availableDevices.length > 0 && (
					<FlatList
						data={availableDevices}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => connectToDevice(item)}
								className="bg-gray-200 p-2 rounded mb-2"
							>
								<Text>{item.name || 'Unknown Device'}</Text>
							</TouchableOpacity>
						)}
						className="mb-4"
					/>
				)}

				<Text className={`text-2xl font-bold mb-4 ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
					{isConnected ? 'Connected to SixPack' : 'Not Connected'}
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