import type { PageLoad } from './$types';
// import { getHistoricalData } from '$lib/socketio';

export const load = (async ({parent}) => {
    const parentData = await parent();
    // const probeHistoricalData = getHistoricalData();
    return {
        ...parentData,
        // probeHistoricalData,
    };
}) satisfies PageLoad;