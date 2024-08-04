// components/ThreeModel.tsx

import React, { useRef } from 'react';
import { View } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { GridHelper } from 'three';

function Cube() {
	const meshRef = useRef<any>();

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.x += delta * 0.5;
			meshRef.current.rotation.y += delta * 0.7;
		}
	});

	return (
		<mesh ref={meshRef} castShadow position={[0, 0.25, 0]}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="orange" />
		</mesh>
	);
}

function Ground() {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
			<planeGeometry args={[10, 10]} />
			<meshStandardMaterial color="#cccccc" />
		</mesh>
	);
}

function GridHelperWrapper() {
	return <primitive object={new GridHelper(10, 10)} />;
}

export default function ThreeDScene() {
	return (
		<View style={{ flex: 1 }}>
			<Canvas shadows camera={{ position: [3, 3, 3] }}>
				<ambientLight intensity={0.1} />
				<directionalLight
					position={[-5, 10, 20]}
					intensity={0.5}
					castShadow
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
				/>
				<pointLight position={[-5, 5, -5]} intensity={4.0} />
				<Cube />
				<Ground />
				<GridHelperWrapper />
			</Canvas>
		</View>
	);
}