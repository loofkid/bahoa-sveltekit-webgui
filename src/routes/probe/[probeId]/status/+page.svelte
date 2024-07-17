<script lang="ts">
	import { onMount } from 'svelte';
    import { onNavigate } from '$app/navigation';
    import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import StatusPanel from '$lib/StatusPanel.svelte';
    import { useProbeStore } from '$lib/socketio';
    import { page } from "$app/stores";
    
    export let data: PageData;

    // const socket = data.socket!;

    // const defaultHistoryRequest = {
    //     probeId: data.probeId!,
    //     start: dayjs().subtract(10, 'minute').toDate(),
    //     end: dayjs().toDate(),
    // };

    // const graphData = useProbeGraphData();

    // onMount(() => {
    //     joinRoom(`${data.probeId!}-graph`);
    // });

    // onNavigate(() => {
    //     leaveRoom(`${data.probeId!}-graph`);
    // })

    // $: console.log($graphData);

    // $: console.log($probes)

    let probe = data.probe;

    const probeStore = useProbeStore(probe.id);

    $: probe = $probeStore;
</script>

{#if probe}
<StatusPanel probe={probe} />
{/if}