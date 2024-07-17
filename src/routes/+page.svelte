<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { probes, useSocketStore, getGraphData } from '$lib/socketio';
    import Icon from '@iconify/svelte';
    import { slide } from 'svelte/transition';


    import { currentBreakpoint } from '$lib/breakpoint';
	import ProbeTile from '$lib/ProbeTile.svelte';
    import StatusPanel from '$lib/StatusPanel.svelte';
    
    export let data: PageData;

    onMount(() => {
    });

    let probesData = data.probes;

    $: probesData = $probes;

    const socket = useSocketStore();

    $: console.log($currentBreakpoint);

    let currentProbe: ProbeData | undefined;
    let currentPanel: string;
    let overlayShown = false;

    let graphData: ProbeEntry[] = [];

    const onStatusClick = async (probeId: string) => {
        currentProbe = probesData?.find(p => p.id === probeId)!;
        graphData = await getGraphData(currentProbe.id);
        currentPanel = "status";
        overlayShown = true;
    }
    const onSetClick = async (probeId: string) => {
        currentProbe = probesData?.find(p => p.id === probeId)!;
        currentPanel = "set";
        overlayShown = true;
    }
    const onToggle = () => {
        if (overlayShown) {
            currentProbe = undefined;
            currentPanel = "";
            overlayShown = false;
        }
    }

    $: console.log(currentProbe);
    $: console.log(currentPanel);
</script>

<div class="flex gap-2 w-full justify-stretch">
    {#key overlayShown}
    <div class="flex @container flex-grow">
        <div class="flex flex-col @md:flex-row 
                    @md:flex-wrap gap-4 content-start">
            {#if probesData?.find(p => p.id === "probe-0")}
            <ProbeTile probe={probesData.find(p => p.id === "probe-0")} 
                unit="ºF" on:status={async () => await onStatusClick('probe-0')}
                on:set={() => onSetClick('probe-0')} />
            {:else}
            <ProbeTile skeleton={true} />
            {/if}
            {#each probesData.slice(1).sort((a, b) => {
                        return parseInt(a.id.replace('probe-', '')) - parseInt(b.id.replace('probe-', ''));
                        }) as probe, i}
            <ProbeTile probe={probe} unit="ºF" 
                on:status={async () => await onStatusClick(probe.id)}
                on:set={() => onSetClick(probe.id)} />
            {:else}
            {#if !$socket || !$socket.connected}
            <ProbeTile skeleton={true} />
            {/if}
            {/each}
        </div>
    </div>
    {/key}
    {#if overlayShown && currentProbe}
    <div class="flex card bg-base-300 w-full max-w-lg" transition:slide={{ axis: 'x'}}>
        <div class="card-body p-4">
            <div class="card-actions justify-between">
                <button class="btn btn-ghost" on:click={onToggle}>
                    <Icon icon="mdi:close"  height="2rem" width="2rem"/>
                </button>
                <h1 class="text-2xl lowercase">{currentProbe.name}</h1>
            </div>
            {#if currentPanel === "status"}
            {#key currentProbe}
            <StatusPanel probe={currentProbe} {graphData} />
            {/key}
            {/if}
            {#if currentPanel === "set"}
            <div>Set Panel</div>
            {/if}
        </div>
    </div>
    {/if}
</div>