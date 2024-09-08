// app/(tabs)/ble.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useColorScheme } from 'nativewind';
import Controls from '@/components/ui/Controls';
import BLEManager from '@/utils/BLEManager';

// Mock BLE data
const mockBLEData = {
	roll: 15.32,
	pitch: -5.67,
	yaw: 178.9,
	accel: 9.81,
	gForce: 1.02,
};

// Mock devices
const mockDevices = [
	{ id: '1', name: 'SixPack Device 1' },
	{ id: '2', name: 'SixPack Device 2' },
	{ id: '3', name: 'Unknown Device' },
];

const BLEScreen = () => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === 'dark';
	const [isConnected, setIsConnected] = useState(false);
	const [bleData, setBLEData] = useState(mockBLEData);
	const [availableDevices, setAvailableDevices] = useState([]);
	const [isScanning, setIsScanning] = useState(false);
	const [error, setError] = useState(null);

	const bleManager = new BLEManager();

	useEffect(() => {
		const interval = setInterval(() => {
			if (isConnected) {
				setBLEData(bleManager.getLatestData());
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [isConnected]);

	const scanForDevices = async () => {
		setIsScanning(true);
		setError(null);
		try {
			await bleManager.startScanning();
			setAvailableDevices(mockDevices); // Replace with actual devices when available
			setIsScanning(false);
		} catch (err) {
			setError(err.message);
			setIsScanning(false);
		}
	};

	const connectToDevice = async (device) => {
		try {
			await bleManager.connectToDevice(device);
			setIsConnected(true);
			setError(null);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<View className={`flex-1 p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
			<ScrollView>
				<Text className={`mt-16 text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>BLE Data:</Text>

				{Object.entries(bleData).map(([key, value]) => (
					<Text key={key} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
						{key}: {value}
					</Text>
				))}

				<Text className={`text-lg font-bold mt-4 mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Raw BLE Data:</Text>
				<Text className={`font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
					{JSON.stringify(bleData, null, 2)}
				</Text>
			</ScrollView>

			<View className="absolute left-1/4 bottom-4">
				<Controls onLayoutChange={() => { }} show3D={false} toggleShow3D={() => { }} />
			</View>

			<TouchableOpacity
				onPress={scanForDevices}
				className={`mt-4 p-3 rounded ${isScanning ? 'bg-gray-500' : 'bg-blue-500'}`}
			>
				<Text className="text-white text-center font-semibold">
					{isScanning ? 'Scanning...' : 'Scan for Devices'}
				</Text>
			</TouchableOpacity>

			{error && <Text className="text-red-500 mt-2">{error}</Text>}

			<Text className={`mt-2 text-lg ${isDark ? 'text-white' : 'text-black'}`}>
				Status: {isConnected ? 'Connected' : 'Disconnected'}
			</Text>

			{availableDevices.length > 0 && (
				<FlatList
					data={availableDevices}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => connectToDevice(item)}
							className={`p-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-300'}`}
						>
							<Text className={isDark ? 'text-white' : 'text-black'}>{item.name}</Text>
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	);
};

export default BLEScreen;