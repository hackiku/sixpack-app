// utils/BLEManager.ts
import { Platform } from 'react-native';

let BleManager: any;
if (Platform.OS === 'ios' || Platform.OS === 'android') {
	BleManager = require('react-native-ble-plx').BleManager;
}

const SERVICE_UUID = '19B10000-E8F2-537E-4F6C-D104768A1214';
const CHARACTERISTIC_UUIDS = {
	roll: '19B10001-E8F2-537E-4F6C-D104768A1214',
	pitch: '19B10002-E8F2-537E-4F6C-D104768A1214',
	yaw: '19B10003-E8F2-537E-4F6C-D104768A1214',
	accel: '19B10004-E8F2-537E-4F6C-D104768A1214',
	gForce: '19B10005-E8F2-537E-4F6C-D104768A1214',
};

class BLEManager {
	private manager: any = null;
	private device: any = null;
	private isConnected: boolean = false;
	private latestData: any = {
		roll: 'Not Connected',
		pitch: 'Not Connected',
		yaw: 'Not Connected',
		accel: 'Not Connected',
		gForce: 'Not Connected',
	};

	constructor() {
		if (BleManager) {
			try {
				this.manager = new BleManager();
				console.log('BLEManager initialized');
			} catch (error) {
				console.error('Failed to initialize BLEManager:', error);
			}
		} else {
			console.log('BLE not supported on this platform');
		}
	}

	async startScanning(): Promise<void> {
		if (!this.manager) {
			console.log('BLE not supported, using mock data');
			this.provideDummyData();
			return Promise.resolve();
		}

		console.log('Starting BLE scan');
		return new Promise((resolve, reject) => {
			this.manager.startDeviceScan(null, null, (error: any, device: any) => {
				if (error) {
					console.error('Scan error:', error);
					this.provideDummyData();
					reject(error);
					return;
				}

				console.log('Device found:', device?.name);
				if (device && device.name === 'SixpackAvionics') {
					this.manager.stopDeviceScan();
					this.connectToDevice(device)
						.then(() => resolve())
						.catch((err) => {
							this.provideDummyData();
							reject(err);
						});
				}
			});

			// Stop scanning after 10 seconds if device not found
			setTimeout(() => {
				if (this.manager) this.manager.stopDeviceScan();
				this.provideDummyData();
				reject(new Error('Device not found within timeout'));
			}, 10000);
		});
	}

	stopScanning(): void {
		if (this.manager) {
			console.log('Stopping BLE scan');
			this.manager.stopDeviceScan();
			if (this.device) {
				this.device.cancelConnection();
			}
		}
		this.isConnected = false;
		this.provideDummyData();
	}

	private async connectToDevice(device: any): Promise<void> {
		try {
			console.log('Connecting to device:', device.name);
			this.device = await device.connect();
			console.log('Connected, discovering services and characteristics');
			await this.device.discoverAllServicesAndCharacteristics();
			this.startNotifications();
			this.isConnected = true;
			console.log('Device setup complete');
		} catch (error) {
			console.error('Connection error:', error);
			this.isConnected = false;
			this.provideDummyData();
			throw error;
		}
	}

	private startNotifications(): void {
		if (!this.device) {
			console.error('No device connected');
			this.provideDummyData();
			return;
		}

		Object.entries(CHARACTERISTIC_UUIDS).forEach(([key, uuid]) => {
			this.device?.monitorCharacteristicForService(SERVICE_UUID, uuid, (error: any, characteristic: any) => {
				if (error) {
					console.error(`Error monitoring ${key}:`, error);
					this.latestData[key] = 'Error';
					return;
				}
				if (characteristic && characteristic.value) {
					const value = this.decodeFloat32(characteristic.value);
					this.latestData[key] = value.toFixed(2);
					console.log(`Updated ${key}:`, this.latestData[key]);
				}
			});
		});
	}

	private decodeFloat32(base64: string): number {
		const buffer = Buffer.from(base64, 'base64');
		return buffer.readFloatLE(0);
	}

	private provideDummyData(): void {
		this.latestData = {
			roll: (Math.random() * 360 - 180).toFixed(2),
			pitch: (Math.random() * 180 - 90).toFixed(2),
			yaw: (Math.random() * 360).toFixed(2),
			accel: (Math.random() * 20).toFixed(2),
			gForce: (Math.random() * 5).toFixed(2),
		};
	}

	getLatestData(): any {
		if (!this.isConnected || !this.manager) {
			this.provideDummyData();
		}
		return this.latestData;
	}

	isDeviceConnected(): boolean {
		return this.isConnected && !!this.manager;
	}
}

export default BLEManager;