// app/(tabs)/sixpack.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import SixPackGrid from '@/components/layout/SixPackGrid';
import Controls from '@/components/ui/Controls';
import { useColorScheme } from 'nativewind';

export default function SixPackScreen() {
	const { colorScheme } = useColorScheme();
	const [layout, setLayout] = useState('3x2');
	const [show3D, setShow3D] = useState(false);

	const handleLayoutChange = (newLayout) => {
		setLayout(newLayout);
	};

	return (
		<View className={`flex-1 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
			<SixPackGrid layout={layout} />

			<View className="p-4 mt-12">
				<Controls
					onLayoutChange={handleLayoutChange}
					show3D={show3D}
					toggleShow3D={() => setShow3D(!show3D)}
				/>
			</View>
		</View>
	);
}