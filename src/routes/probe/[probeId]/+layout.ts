import { getProbe } from '$lib/socketio';
import type { LayoutLoad } from './$types';

export const load = (async ({params, parent}) => {
    const parentData = await parent();
    const { probeId } = params;
    const probe = await getProbe(probeId);

    parentData.title = probe.name;
    
    return {
        ...parentData,
        probe,
    };
}) satisfies LayoutLoad;