import React from 'react';
import { View } from 'react-native';
import SixPackGrid from '@/components/layout/SixPackGrid';
import Controls from '@/components/ui/Controls';
import { useColorScheme } from 'nativewind';

export default function SixPackScreen() {
	const { colorScheme } = useColorScheme();

	return (
		<View className={`flex-1 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
			<SixPackGrid />
			<View className="p-4 mt-12">
				{/* <ToggleMode /> */}
				<Controls onLayoutChange={(newLayout) => console.log('Layout changed to:', newLayout)} />
			</View>
		</View>
	);
}