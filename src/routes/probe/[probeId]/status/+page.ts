import type { PageLoad } from './$types';
// import dayjs from "dayjs";
import { getGraphData } from '$lib/socketio';

export const load = (async ({parent}) => {
    const parentData = await parent();

    const probe = parentData.probe;

    let graphData: ProbeEntry[] = [];
    if (probe) {
        graphData = await getGraphData(probe.id);
    }

    return {
        ...parentData,
        graphData,
    };
}) satisfies PageLoad;