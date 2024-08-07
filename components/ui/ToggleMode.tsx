// components/ui/ToggleMode.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

export default function BrutalistToggle() {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	return (
		<TouchableOpacity
			onPress={toggleColorScheme}
			className="mb-4 px-4 py-2 bg-[#AE7AFF] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
		>
			<Text className="text-black font-bold text-lg">
				{colorScheme === "dark" ? "Light" : "Dark"} Mode
			</Text>
		</TouchableOpacity>
	);
}