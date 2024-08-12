// @/components/ui/Controls.tsx

import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { useColorScheme } from 'nativewind';

const gridLayouts = ['3x2', '6x1', '2x3', '1x6'];

const Controls = ({ onLayoutChange }) => {
	const { colorScheme, toggleColorScheme } = useColorScheme();
	const [show3D, setShow3D] = useState(false);
	const [currentLayoutIndex, setCurrentLayoutIndex] = useState(0);

	const rotateAnim = new Animated.Value(0);

	const buttons = [
		{
			emoji: colorScheme === 'dark' ? '🌞' : '🌙',
			onPress: toggleColorScheme,
		},
		{
			emoji: show3D ? '🧊' : '⏹️',
			onPress: () => {
				setShow3D(!show3D);
				Animated.timing(rotateAnim, {
					toValue: show3D ? 0 : 1,
					duration: 300,
					useNativeDriver: true,
				}).start();
			},
		},
		{
			emoji: '📊',
			onPress: () => {
				const nextIndex = (currentLayoutIndex + 1) % gridLayouts.length;
				setCurrentLayoutIndex(nextIndex);
				onLayoutChange(gridLayouts[nextIndex]);
			},
		},
	];

	const spin = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<View className="flex-row justify-center items-center gap-4">
			{buttons.map((button, index) => (
				<TouchableOpacity
					key={index}
					onPress={button.onPress}
					className={`flex justify-center items-center rounded-full 
						border-4 border-black transition-all duration-300 
						w-16 h-16 bg-white active:bg-black active:text-white
						shadow-[4px_4px_0px_0px_#000000] 
						active:shadow-[2px_2px_0px_0px_#000000] 
						active:translate-x-[2px] active:translate-y-[2px]`}
				>
					<Animated.Text
						style={index === 1 ? { transform: [{ rotate: spin }] } : {}}
						className="text-2xl"
					>
						{button.emoji}
					</Animated.Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Controls;