const breakpoints: {id: string, query: string}[] = [
    { id: 'sm', query: '(min-width: 640px)' },
    { id: 'md', query: '(min-width: 768px)' },
    { id: 'lg', query: '(min-width: 1024px)' },
    { id: 'xl', query: '(min-width: 1280px)' },
    { id: '2xl', query: '(min-width: 1536px)' },
];

import { readable } from 'svelte/store';
import { browser } from '$app/environment';
const breakpointMatcher = (mediaQueries: {id: string, query: string}[]) => {
    if (!browser)
        return readable(null); //return null if window doesn't exist
    return readable('', (set) => {
        const mediaQueryList = mediaQueries.map((mql) => ({ id: mql.id, mql: window.matchMedia(mql.query)}));
        // function that set current breakpoint
        function setCurrentBreakPoint() {
            const match = mediaQueryList.find((mql) => mql.mql.matches);
            set(match ? match.id : "");
        }
        setCurrentBreakPoint(); //set the current breakpoint for the first time
        window.addEventListener('resize', () => {
            // TODO: figure out a way to change the resize event
            setCurrentBreakPoint(); //set the current breakpoint when the size change
        });
    });
};

export const currentBreakpoint =  breakpointMatcher(breakpoints);

export const breakpointLevel = (bp: string | null) => {
    return bp ? breakpoints.findIndex((b) => b.id === bp) : -1;
}