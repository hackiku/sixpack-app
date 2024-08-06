// components/layout/SixPackGrid.tsx

import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Altimeter from '@/components/instruments/Altimeter';
import Gps from '@/components/instruments/Gps';
import Compass from '@/components/instruments/Compass';
// import ThreeDScene from './ThreeDScene';

// const INSTRUMENTS = [Altimeter, Gps, Compass, ThreeDScene, View, View]; // Placeholder Views for remaining instruments
const INSTRUMENTS = [Altimeter, Gps, Compass, View, View]; // Placeholder Views for remaining instruments

export default function SixPackLayout() {
	const [selectedInstrument, setSelectedInstrument] = useState(null);

	const renderInstrument = (Instrument, index) => (
		<TouchableOpacity
			key={index}
			style={styles.instrumentContainer}
			onPress={() => setSelectedInstrument(index)}
		>
			<Instrument />
		</TouchableOpacity>
	);

	if (selectedInstrument !== null) {
		const SelectedInstrument = INSTRUMENTS[selectedInstrument];
		return (
			<View style={styles.fullScreenContainer}>
				<SelectedInstrument />
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => setSelectedInstrument(null)}
				>
					<Text>Back to Six Pack</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{INSTRUMENTS.map(renderInstrument)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 10,
	},
	instrumentContainer: {
		width: '48%',
		aspectRatio: 1,
		margin: '1%',
		borderWidth: 1,
		borderColor: 'black',
	},
	fullScreenContainer: {
		flex: 1,
	},
	backButton: {
		position: 'absolute',
		top: 20,
		left: 20,
		padding: 10,
		backgroundColor: 'rgba(255,255,255,0.7)',
		borderRadius: 5,
	},
});