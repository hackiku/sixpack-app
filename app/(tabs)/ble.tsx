// app/(tabs)/ble.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme, FlatList } from 'react-native';
import Controls from '@/components/ui/Controls';

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
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';
	const [isConnected, setIsConnected] = useState(false);
	const [bleData, setBLEData] = useState(mockBLEData);
	const [availableDevices, setAvailableDevices] = useState([]);
	const [isScanning, setIsScanning] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const interval = setInterval(() => {
			if (isConnected) {
				setBLEData({
					roll: Number((Math.random() * 360 - 180).toFixed(2)),
					pitch: Number((Math.random() * 180 - 90).toFixed(2)),
					yaw: Number((Math.random() * 360).toFixed(2)),
					accel: Number((Math.random() * 20).toFixed(2)),
					gForce: Number((Math.random() * 5).toFixed(2)),
				});
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [isConnected]);

	const scanForDevices = () => {
		setIsScanning(true);
		setError(null);
		// Simulate scanning process
		setTimeout(() => {
			setAvailableDevices(mockDevices);
			setIsScanning(false);
		}, 2000);
	};

	const connectToDevice = (device) => {
		// Simulate connection process
		setTimeout(() => {
			setIsConnected(true);
			setError(null);
		}, 1000);
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 16,
			backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
		},
		button: {
			backgroundColor: '#4a90e2',
			padding: 10,
			borderRadius: 5,
			marginBottom: 16,
		},
		buttonText: {
			color: 'white',
			textAlign: 'center',
			fontSize: 16,
		},
		statusText: {
			fontSize: 18,
			marginBottom: 16,
			color: isDark ? '#ffffff' : '#000000',
		},
		headerText: {
			fontSize: 18,
			fontWeight: 'bold',
			marginTop: 16,
			marginBottom: 8,
			color: isDark ? '#ffffff' : '#000000',
		},
		dataText: {
			fontSize: 16,
			marginBottom: 4,
			color: isDark ? '#e0e0e0' : '#333333',
		},
		rawDataText: {
			fontSize: 14,
			fontFamily: 'Courier',
			color: isDark ? '#e0e0e0' : '#333333',
		},
		controlsContainer: {
			position: 'absolute',
			left: '25%',
			bottom: 16,
		},
		errorText: {
			color: 'red',
			marginBottom: 16,
		},
		deviceItem: {
			padding: 10,
			borderBottomWidth: 1,
			borderBottomColor: isDark ? '#333333' : '#cccccc',
		},
	});

	return (
		<View style={styles.container}>
			<ScrollView>

				<Text style={styles.headerText}>BLE Data:</Text>

				{Object.entries(bleData).map(([key, value]) => (
					<Text key={key} style={styles.dataText}>
						{key}: {value}
					</Text>
				))}

				<Text style={styles.headerText}>Raw BLE Data:</Text>
				<Text style={styles.rawDataText}>
					{JSON.stringify(bleData, null, 2)}
				</Text>
			</ScrollView>

			<View style={styles.controlsContainer}>
				<Controls onLayoutChange={() => { }} show3D={false} toggleShow3D={() => { }} />
			</View>


			<TouchableOpacity onPress={scanForDevices} style={styles.button}>
				<Text style={styles.buttonText}>
					{isScanning ? 'Scanning...' : 'Scan for Devices'}
				</Text>
			</TouchableOpacity>

			{error && <Text style={styles.errorText}>{error}</Text>}

			<Text style={styles.statusText}>
				Status: {isConnected ? 'Connected' : 'Disconnected'}
			</Text>

			{availableDevices.length > 0 && (
				<FlatList
					data={availableDevices}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => connectToDevice(item)}
							style={styles.deviceItem}
						>
							<Text style={styles.dataText}>{item.name}</Text>
						</TouchableOpacity>
					)}
				/>
			)}

		</View>
	);
};

export default BLEScreen;

// This file contains a BLE screen with simulated device scanning and connection functionality.
// It displays debug data and supports dark mode.
// TODO: Replace mock data and simulated functions with actual BLE logic when ready.
// TODO: Implement proper error handling for real BLE operations.
// TODO: Add disconnect functionality.