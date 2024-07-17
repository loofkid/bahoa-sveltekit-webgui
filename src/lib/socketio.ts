/* eslint-disable no-self-assign */
import { io } from 'socket.io-client';
import { writable, readable, type Writable, type Readable, readonly } from 'svelte/store';
import { getContext, hasContext, setContext } from 'svelte';
import { browser } from '$app/environment';
import { useWritable } from '$lib/sharedStores';
import dayjs from 'dayjs';

export const connectSocket = ()  => {
    let uri: string;
    let room = "web";
    if (browser && window.location.hostname.match(/devtunnels/)) {
        uri = 'https://pv4px63r-3000.use.devtunnels.ms/';
    }
    else if (!browser) {
        uri = 'ws://bahoa-go:3000/';
        room = 'server';
    }
    else {
        uri = 'ws://blarp.local:3000/';
    }
    const socket = io(uri, {
        reconnectionDelayMax: 10000,
        reconnection: true,
        path: "/socket.io",
        extraHeaders: {
            'Authorization': 'Bearer Tusk-Lure-Passably-Compress-Flattery-Crouton-Dayroom5-Smashup-Lusty-Probably',
        },
    });

    socket.on('connect', () => {
        console.log('connected');

        socket.emit('joinRoom', room, (ack: { message: string }, err: Error) => {
            if (!err) {
                console.log(ack.message);
            }
        });
    });

    return socket;
};
const socket = connectSocket();

// socket.on('connect', () => {useWritableSocketStore().set(socket)});
// socket.on('disconnect', () => {useWritableSocketStore().set(socket)});

export const socketioReadableStore = <T>(socketConfig: { event: string, defaultValue: T }): Readable<T> => {
    // const socket = get(socketStore);
    const { event, defaultValue } = socketConfig;
    const { subscribe } = readable<T>(defaultValue, (set) => {
        socket.on(event, (data: T) => {
            set(data);
        });

        return () => socket.off(event);
    });

    return {
        subscribe,
    };
};

export const socketioWritableStore = <T>(socketConfig: { event: string, defaultValue: T, writeEvent?: string }): Writable<T> => {
    // const socket = get(socketStore);
    const { event, defaultValue } = socketConfig;
    let { writeEvent } = socketConfig;
    if (!writeEvent) {
        writeEvent = event;
    }
    const { subscribe, set, update } = writable<T>(defaultValue, (set) => {
        socket.on(event, (data: T) => {
            set(data);
        });

        return () => socket.off(event);
    });
    
    const _set = (value: T) => {
        socket.emit(writeEvent, value);
        set(value);
    };

    return {
        subscribe,
        set: _set,
        update,
    };
};

export const useSocketioReadableStore = <T>(socketConfig: {event: string, defaultValue: T}): Readable<T> => {
    const { event, defaultValue } = socketConfig;
    const name = `socketio-${event}`;
    if (hasContext(name)) {
        return getContext<Readable<T>>(name);
    }
    const _value = socketioReadableStore({event, defaultValue});
    setContext(name, _value);
    return _value;
}

export const useSocketioWritableStore = <T>(socketConfig: {event: string, defaultValue: T, writeEvent?: string}): Writable<T> => {
    const { event, defaultValue, writeEvent } = socketConfig;
    const name = `socketio-${event}`;
    if (hasContext(name)) {
        return getContext<Writable<T>>(name);
    }
    let _value: ReturnType<typeof socketioWritableStore<T>>;
    if (writeEvent) {
        _value = socketioWritableStore<T>({event, defaultValue, writeEvent});
    }
    else {
        _value = socketioWritableStore<T>({event, defaultValue});
    }
    setContext(name, _value);
    return _value;
}

export const useProbesStore = () => useSocketioReadableStore<ProbeData[]>({event: 'probes', defaultValue: []});


export const probeGraphData = socketioReadableStore<ProbeEntry[]>({event: 'graphData', defaultValue: []});

export const useProbeGraphData = () => useSocketioReadableStore<ProbeEntry[]>({event: "graphData", defaultValue: []});
const useWritableSocketStore = () => useWritable('socket', socket);
export const useSocketStore = () => readonly(useWritableSocketStore());

export const getProbe = (probeId: string) => 
    new Promise<ProbeData>((resolve) => {
        socket.emit('getProbe', probeId, (data: ProbeData) => {
            resolve(data);
        });
    });

export const createProbeStore = (probeId: string) => {
    joinRoom(probeId);
    const defaultProbe: ProbeData = {
        id: probeId,
        name: "",
        tempK: 0,
        tempC: 0,
        tempF: 0,
        setTempK: 0,
        setTempC: 0,
        setTempF: 0,
        avgTempK: 0,
        avgTempC: 0,
        avgTempF: 0,
    };
    const { subscribe } = readable<ProbeData>(defaultProbe, (set) => {
        socket.on("probe", (data: ProbeData) => {
            set(data);
        });

        return () => {
            socket.off("probe");
            leaveRoom(probeId);
        }
    });

    return {
        subscribe,
    };
}

export const useProbeStore = (probeId: string) => {
    const name = `socketio-${probeId}`;
    if (hasContext(name)) {
        return getContext<Readable<ProbeData>>(name);
    }
    const _value = createProbeStore(probeId);
    setContext(name, _value);
    return _value;
}

export const getProbes = () =>
    new Promise<ProbeData[]>((resolve) => {
        socket.emit('getProbes', (data: ProbeData[]) => {
            resolve(data);
        });
    });

const defaultHistoryRequest = {
    start: dayjs().subtract(10, 'minute').toDate(),
    end: dayjs().toDate(),
};

export const getHistoricalData = (probeId: string, config: {start: Date, end: Date} = defaultHistoryRequest) => 
    new Promise<ProbeEntry[]>((resolve) => {
        socket.emit('getHistoricalData', {probeId, ...config}, (data: ProbeEntry[]) => {
            resolve(data);
        });
    });

export const getGraphData = (probeId: string) =>
    new Promise<ProbeEntry[]>((resolve) => {
        socket.emit('getGraphData', probeId, (data: ProbeEntry[]) => {
            resolve(data);
        });
    });

export const joinRoom = (room: string) => {
    socket.emit('joinRoom', room, (ack: { message: string }, err: Error) => {
        if (!err) {
            console.log(ack.message);
        }
    });
}

export const leaveRoom = (room: string) => {
    socket.emit('leaveRoom', room, (ack: { message: string }, err: Error) => {
        if (!err) {
            console.log(ack.message);
        }
    });
}

export const setProbeName = (probeId: string, name: string) => {
    socket.emit('setProbeName', {probeId, name});
}

export const probes = socketioReadableStore<ProbeData[]>({event: 'probes', defaultValue: []});