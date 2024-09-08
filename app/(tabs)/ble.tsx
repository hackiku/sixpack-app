// app/(tabs)/ble.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Controls from '@/components/ui/Controls';

// Mock BLE data
const mockBLEData = {
	roll: 15.32,
	pitch: -5.67,
	yaw: 178.9,
	accel: 9.81,
	gForce: 1.02,
};

const BLEScreen = () => {
	const colorScheme = useColorScheme();
	const [isConnected, setIsConnected] = useState(false);
	const [bleData, setBLEData] = useState(mockBLEData);

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

	const toggleConnection = () => {
		setIsConnected(!isConnected);
	};

	const isDark = colorScheme === 'dark';

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
	});

	return (
		<View style={styles.container}>
			<ScrollView>
				<TouchableOpacity onPress={toggleConnection} style={styles.button}>
					<Text style={styles.buttonText}>
						{isConnected ? 'Disconnect' : 'Connect'}
					</Text>
				</TouchableOpacity>

				<Text style={styles.statusText}>
					Status: {isConnected ? 'Connected' : 'Disconnected'}
				</Text>

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
		</View>
	);
};

export default BLEScreen;

// This file contains a BLE screen for debugging purposes with dark mode support.
// It uses mock data to simulate BLE connections and data updates.
// The Controls component is included at the bottom of the screen.
// TODO: Replace mock data with actual BLE functionality when ready.
// TODO: Implement real connection logic and data fetching from BLE device.
// TODO: Implement functionality for Controls component if needed.