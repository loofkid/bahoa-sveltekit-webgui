import { getProbes } from '$lib/socketio';
import type { PageLoad } from './$types';

export const load = (async ({parent}) => {
    const parentData = await parent();

    parentData.title = 'dashboard';

    const probes = await getProbes();

    return {
        ...parentData,
        probes,
    };
}) satisfies PageLoad;