// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}


	declare interface ProbeEntry {
		probeId: string;
		temperature: number;
		timestamp: number;
		setTemperature: number;
	}

	declare interface ProbeData {
		id: string;
		name: string;
		tempK: number;
		tempC: number;
		tempF: number;
		setTempK: number;
		setTempC: number;
		setTempF: number;
		avgTempK: number;
		avgTempC: number;
		avgTempF: number;
	}
}

export {};
