import React from 'react';
import { View } from 'react-native';
import SixPackLayout from '../../components/layout/SixPackGrid';

export default function SixPackScreen() {
	return (
		<View style={{ flex: 1 }}>
			<SixPackLayout />
		</View>
	);
}