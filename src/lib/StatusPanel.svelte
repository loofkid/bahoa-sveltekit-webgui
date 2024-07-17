<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { invalidate, onNavigate } from '$app/navigation';
    import dayjs from 'dayjs';
    import { probeGraphData, joinRoom, leaveRoom, setProbeName, probes } from '$lib/socketio';
	import ProbeChart from '$lib/ProbeChart.svelte';

    export let probe: ProbeData;

    export let graphData: ProbeEntry[] = [];

    const probeId = probe.id;
    $: probeName = probe.name;
    

    $: newProbeName = probeName;

    // const socket = data.socket!;
    
    // const defaultHistoryRequest = {
    //     probeId: data.probeId!,
    //     start: dayjs().subtract(10, 'minute').toDate(),
    //     end: dayjs().toDate(),
    // };
    
    $: {
        leaveRoom(`probe-0-graph`);
        leaveRoom(`probe-1-graph`);
        leaveRoom(`probe-2-graph`);
        leaveRoom(`probe-3-graph`);
        joinRoom(`${probeId}-graph`);
    }
    
    onMount(() => {
        joinRoom(`${probeId}-graph`);
    });
    
    onDestroy(() => {
        leaveRoom(`${probeId}-graph`);
    });

    const parseReadings = (graphData: ProbeEntry[]) => {
        const parsedTimestamps = graphData.map(d => new Date(d.timestamp));
        const parsedReadings = graphData.map(d => (d.temperature - 273.15) * 9 / 5 + 32);
        const parsedSetTemps = graphData.map(d => d.setTemperature === 0 ? 0 : (d.setTemperature - 273.15) * 9 / 5 + 32);

        return {
            timestamps: parsedTimestamps,
            readings: parsedReadings,
            setTemps: parsedSetTemps,
        };
    }

    let graphValues = parseReadings(graphData);

    $: graphValues = parseReadings($probeGraphData);

    const updateName = () => {
        setProbeName(probeId, newProbeName);
        invalidate("change:title");
    }
</script>

<div class="flex flex-col items-stretch flex-grow max-w-96 sm:max-w-full gap-4 @container">
    <div class="@sm:flex flex-col @lg:flex-row contents gap-4">
        <ProbeChart data={graphValues} readingColor="#ef4444" setTempColor="#3b82f6" unit="°F" timeFrame="10 minutes" />
        <div class="card bg-neutral text-neutral-content @sm:min-w-96">
            <div class="card-body flex flex-col gap-2 p-4">
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span>probe name</span>
                    </div>
                    <input type="text" placeholder="name" class="input input-bordered w-full max-w-xs" bind:value={newProbeName} on:blur={updateName} />
                </label>
            </div>
        </div>
    </div>
</div>