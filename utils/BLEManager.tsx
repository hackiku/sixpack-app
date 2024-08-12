// utils/BLEManager.ts
// This utility class manages BLE connections and data retrieval from the Arduino device

// import { BleManager, Device } from 'react-native-ble-plx';

// const SERVICE_UUID = '19B10000-E8F2-537E-4F6C-D104768A1214';
// const CHARACTERISTIC_UUIDS = {
// 	roll: '19B10001-E8F2-537E-4F6C-D104768A1214',
// 	pitch: '19B10002-E8F2-537E-4F6C-D104768A1214',
// 	yaw: '19B10003-E8F2-537E-4F6C-D104768A1214',
// 	accel: '19B10004-E8F2-537E-4F6C-D104768A1214',
// 	gForce: '19B10005-E8F2-537E-4F6C-D104768A1214',
// };

// class BLEManager {
// 	private manager: BleManager;
// 	private device: Device | null = null;
// 	private latestData: any = {
// 		roll: 'N/A',
// 		pitch: 'N/A',
// 		yaw: 'N/A',
// 		accel: 'N/A',
// 		gForce: 'N/A',
// 	};

// 	constructor() {
// 		this.manager = new BleManager();
// 		console.log('BLEManager initialized');
// 	}

// 	async startScanning(): Promise<void> {
// 		console.log('Starting BLE scan');
// 		return new Promise((resolve, reject) => {
// 			this.manager.startDeviceScan(null, null, (error, device) => {
// 				if (error) {
// 					console.error('Scan error:', error);
// 					reject(error);
// 					return;
// 				}

// 				console.log('Device found:', device?.name);
// 				if (device && device.name === 'SixpackAvionics') {
// 					this.manager.stopDeviceScan();
// 					this.connectToDevice(device)
// 						.then(() => resolve())
// 						.catch(reject);
// 				}
// 			});

// 			// Stop scanning after 10 seconds if device not found
// 			setTimeout(() => {
// 				this.manager.stopDeviceScan();
// 				reject(new Error('Device not found within timeout'));
// 			}, 10000);
// 		});
// 	}

// 	stopScanning(): void {
// 		console.log('Stopping BLE scan');
// 		this.manager.stopDeviceScan();
// 		if (this.device) {
// 			this.device.cancelConnection();
// 		}
// 	}

// 	private async connectToDevice(device: Device): Promise<void> {
// 		try {
// 			console.log('Connecting to device:', device.name);
// 			this.device = await device.connect();
// 			console.log('Connected, discovering services and characteristics');
// 			await this.device.discoverAllServicesAndCharacteristics();
// 			this.startNotifications();
// 			console.log('Device setup complete');
// 		} catch (error) {
// 			console.error('Connection error:', error);
// 			throw error;
// 		}
// 	}

// 	private startNotifications(): void {
// 		if (!this.device) {
// 			console.error('No device connected');
// 			return;
// 		}

// 		Object.entries(CHARACTERISTIC_UUIDS).forEach(([key, uuid]) => {
// 			this.device?.monitorCharacteristicForService(SERVICE_UUID, uuid, (error, characteristic) => {
// 				if (error) {
// 					console.error(`Error monitoring ${key}:`, error);
// 					return;
// 				}
// 				if (characteristic && characteristic.value) {
// 					const value = this.decodeFloat32(characteristic.value);
// 					this.latestData[key] = value.toFixed(2);
// 					console.log(`Updated ${key}:`, this.latestData[key]);
// 				}
// 			});
// 		});
// 	}

// 	private decodeFloat32(base64: string): number {
// 		const buffer = Buffer.from(base64, 'base64');
// 		return buffer.readFloatLE(0);
// 	}

// 	getLatestData(): any {
// 		return this.latestData;
// 	}
// }

// export default BLEManager;