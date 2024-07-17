<script lang="ts">
    import { fade } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";
    import { currentBreakpoint, breakpointLevel } from '$lib/breakpoint' 

    const dispatch = createEventDispatcher();

    export let probe: ProbeData | undefined = undefined;
    export let unit: 'K' | 'ºC' | 'ºF' | undefined = undefined;
    export let skeleton = false;
    export let style = "";

    const buttonClick = (event: MouseEvent, button: string) => {
        if (!breakpointLevel($currentBreakpoint) || breakpointLevel($currentBreakpoint) > 0) {
            event.preventDefault();
            dispatch(button);
        }
    }
</script>

{#if !skeleton && probe && unit}
<div class="stats stats-vertical 
            sm:stats-horizontal bg-base-300 
            sm:w-[30rem] h-[15.625rem] 
            sm:h-[8.125rem] sm:[grid-template-columns:3fr_2fr]
            overflow-hidden max-sm:first:[grid-row:1]
            sm:first:[grid-column:1]" style={style} in:fade>
    <a class="btn btn-ghost stat h-auto font-normal text-left sm:rounded-l-[1rem] sm:rounded-r-none" href="/probe/{probe.id}/status" on:click={(event) => buttonClick(event, "status")}>
        <div class="stat-title text-lg lowercase">{probe.name} temperature</div>
        <div class="stat-value text-6xl w-48">{probe.tempF.toFixed(1)} <span class="align-top text-md">{unit}</span></div>
        <div class="stat-figure text-primary sm:hidden">
            <Icon icon="material-symbols-light:arrow-circle-right-outline-rounded" height="3rem" width="3rem" />
        </div>
        <div class="stat-figure text-primary hidden sm:flex [grid-row:1]">
            <Icon icon="material-symbols-light:arrow-circle-right-rounded" height="1.5rem" width="1.5rem" />
        </div>
    </a>
    <a class="btn btn-ghost stat h-auto font-normal text-left sm:rounded-r-[1rem] sm:rounded-l-none" href="/probe/{probe.id}/set" on:click={(event) => buttonClick(event, "set")}>
        <div class="stat-title text-sm lowercase">Set temperature</div>
        <div class="stat-value text-4xl">{probe.setTempF.toFixed(1)}°F</div>
        <div class="stat-figure text-secondary sm:hidden">
            <Icon icon="material-symbols-light:arrow-circle-right-outline-rounded" height="2rem" width="2rem" />
        </div>
        <div class="stat-figure text-secondary hidden sm:flex [grid-row:1]">
            <Icon icon="material-symbols-light:arrow-circle-right-rounded" height="1.5rem" width="1.5rem" />
        </div>
    </a>
</div>
{:else}
<div class="stats stats-vertical 
            sm:stats-horizontal bg-base-300 
            sm:w-[30rem] skeleton 
            h-[15.625rem] sm:h-[8.125rem]
            sm:[grid-template-columns:3fr_2fr]
            overflow-hidden max-sm:first:[grid-row:1]
            sm:first:[grid-column:1]" style={style} out:fade>
    <div class="btn btn-ghost stat h-auto font-normal text-left skeleton rounded-none">
        <div class="stat-title text-lg lowercase skeleton rounded-none"></div>
        <div class="stat-value text-6xl w-48 skeleton"></div>
        <div class="stat-figure text-primary sm:hidden skeleton">
        </div>
        <div class="stat-figure text-primary hidden sm:flex [grid-row:1] skeleton">
        </div>
    </div>
    <div class="btn btn-ghost stat h-auto font-normal text-left skeleton rounded-none">
        <div class="stat-title text-sm lowercase skeleton"></div>
        <div class="stat-value text-4xl skeleton"></div>
        <div class="stat-figure text-secondary sm:hidden skeleton">
        </div>
        <div class="stat-figure text-secondary hidden sm:flex [grid-row:1] skeleton">
        </div>
    </div>
</div>
{/if}