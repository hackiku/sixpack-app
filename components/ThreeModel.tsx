// components/ThreeDScene.tsx
import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { GridHelper, Vector3, BufferGeometry, LineBasicMaterial, Line } from 'three';

// import React, { useRef } from 'react';
// import { View } from 'react-native';
// import { Canvas, useFrame } from '@react-three/fiber/native';
// import { GridHelper, Vector3, BufferGeometry, LineBasicMaterial, Line } from 'three';

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

function Axes() {
	const nsAxisPoints = [new Vector3(0, 0, -5), new Vector3(0, 0, 5)];
	const weAxisPoints = [new Vector3(-5, 0, 0), new Vector3(5, 0, 0)];

	const nsGeometry = new BufferGeometry().setFromPoints(nsAxisPoints);
	const weGeometry = new BufferGeometry().setFromPoints(weAxisPoints);

	const material = new LineBasicMaterial({ color: 0xffffff });

	return (
		<>
			<primitive object={new Line(nsGeometry, material)} />
			<primitive object={new Line(weGeometry, material)} />
		</>
	);
}

function NorthVector({ northDegrees }: { northDegrees: number }) {
	const northRadians = (northDegrees * Math.PI) / 180;

	const startPoint = new Vector3(0, 0, 0);
	const endPoint = new Vector3(
		Math.sin(northRadians) * 3,
		0,
		Math.cos(northRadians) * 3
	);

	const geometry = new BufferGeometry().setFromPoints([startPoint, endPoint]);
	const material = new LineBasicMaterial({ color: 0xff0000 });

	return <primitive object={new Line(geometry, material)} />;
}

export default function ThreeDScene() {
	const [northDegrees, setNorthDegrees] = useState(45);

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
				<pointLight position={[0, 2, 0]} intensity={2.0} />
				<Cube />
				<Ground />
				<GridHelperWrapper />
				<Axes />
				<NorthVector northDegrees={northDegrees} />
			</Canvas>
			<View style={{ position: 'absolute', top: 10, left: 10, right: 10, bottom: 10 }}>
				<Text style={{ color: 'white', fontSize: 16, position: 'absolute', top: 0, alignSelf: 'center' }}>N</Text>
				<Text style={{ color: 'white', fontSize: 16, position: 'absolute', bottom: 0, alignSelf: 'center' }}>S</Text>
				<Text style={{ color: 'white', fontSize: 16, position: 'absolute', left: 0, top: '50%' }}>W</Text>
				<Text style={{ color: 'white', fontSize: 16, position: 'absolute', right: 0, top: '50%' }}>E</Text>
				<Text style={{ color: 'white', fontSize: 16, position: 'absolute', top: 10, left: 10 }}>
					North: {northDegrees}°
				</Text>
			</View>
		</View>
	);
}
