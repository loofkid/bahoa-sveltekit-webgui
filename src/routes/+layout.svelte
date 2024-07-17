<script lang="ts">
    import "../app.css";

    import type { LayoutData } from './$types';
	import { page } from '$app/stores';
    import Icon, { enableCache } from '@iconify/svelte';
    import { onMount } from 'svelte';
    
    export let data: LayoutData;

    enableCache('local');

    const links = [
        {
            name: 'dashboard',
            href: '/',
        },
        {
            name: 'history',
            href: '/history',
        },
        {
            name: 'settings',
            href: '/settings',
        },
    ];

    let drawerOpened = false;

    onMount(() => {
        // const socket = data.socket!;
        
        // socket.on('probeDisconnected', (probeId: string) => {
        //     $probes = $probes.filter(p => p.id !== probeId).sort((a, b) => {
        //             return parseInt(a.id.replace('probe-', '')) - parseInt(b.id.replace('probe-', ''));
        //         });

        //     data = data;
        // });
    });
</script>

<svelte:head>
    <title>{$page.data.title} - Ba Hoa Smokers</title>
</svelte:head>

<div class="drawer">
    <input id="navDrawer" type="checkbox" bind:checked={drawerOpened} class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
        <div class="navbar bg-base-300 rounded-lg drop-shadow w-full">
            <div class="flex-none lg:hidden">
                <label for="navDrawer" class="btn btn-square btn-ghost" aria-label="open sidebar">
                    <Icon icon="ic:round-menu" height="3rem" width="3rem" />
                </label>
            </div>
            <h1 class="mx-2 px-2 text-2xl max-lg:flex-1">Ba Hoa</h1>
            <h2 class="mx-2 lg:flex-1 px-2 text-xl justify-self-start">{$page.data.title}</h2>
            <div class="hidden flex-none lg:block">
                <ul class="menu menu-horizontal">
                    {#each links as link}
                    <li><a href={link.href}>{link.name}</a></li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="flex p-4 flex-grow">
            <slot />
        </div>
    </div>
    <div class="drawer-side">
        <label for="navDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
            <label for="navDrawer" class="btn btn-square btn-ghost" aria-label="close sidebar">
                <Icon icon="ic:round-close" height="3rem" width="3rem" />
            </label>
            {#each links as link}
            <li><a href={link.href} class="text-4xl lg:text-base" on:click={() => drawerOpened = false}>{link.name}</a></li>
            {/each}
        </ul>
    </div>
</div>