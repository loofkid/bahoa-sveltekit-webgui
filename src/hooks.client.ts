import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.match('.*')) {
        console.log(event.url.pathname)
        if (event.request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }
    }

    const response = await resolve(event);
    if (event.url.pathname.match('.*')) {
        console.log(event.url.pathname)
        response.headers.append('Access-Control-Allow-Origin', '*');
    }

    return response;
}