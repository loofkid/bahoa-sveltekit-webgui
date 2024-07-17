import { connectSocket } from '$lib/socketio';
import type { LayoutLoad } from './$types';

export const load = (async ({parent, depends}) => {
    const parentData = await parent();
    const title = '';

    depends('change:title');
    connectSocket();

    return {
        ...parentData,
        title,
    };
}) satisfies LayoutLoad;