import type { IconifyIcon } from "@iconify/utils";
const icons: {[key: string]: IconifyIcon} = {
    outlineSignalWifiStatusbarNull: {
        body: "<path fill=\"currentColor\" d=\"M12 4C7.31 4 3.07 5.9 0 8.98L12 21L24 8.98A16.88 16.88 0 0 0 12 4M2.92 9.07C5.51 7.08 8.67 6 12 6s6.49 1.08 9.08 3.07L12 18.17z\"/>",
    },
    sharpWifi1Bar: {
        body: "<path fill=\"currentColor\" d=\"M15.53 17.46L12 21l-3.53-3.54c.9-.9 2.15-1.46 3.53-1.46s2.63.56 3.53 1.46\"/>",
    },
    sharpWifi2Bar: {
        body: "<path fill=\"currentColor\" d=\"M12 10c3.03 0 5.78 1.23 7.76 3.22l-2.12 2.12A7.967 7.967 0 0 0 12 13c-2.2 0-4.2.9-5.64 2.35l-2.12-2.12C6.22 11.23 8.97 10 12 10m0 6c-1.38 0-2.63.56-3.53 1.46L12 21l3.53-3.54A4.98 4.98 0 0 0 12 16\"/>",
    },
    sharpWifi: {
        body: "<path fill=\"currentColor\" d=\"m1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9m8 8l3 3l3-3a4.237 4.237 0 0 0-6 0m-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13\"/>",
    },
    sharpWifiOff: {
        body: "<path fill=\"currentColor\" d=\"m21 11l2-2c-3.73-3.73-8.87-5.15-13.7-4.31l2.58 2.58c3.3-.02 6.61 1.22 9.12 3.73M9 17l3 3l3-3a4.237 4.237 0 0 0-6 0m10-4a9.895 9.895 0 0 0-3.72-2.33l3.02 3.02zM3.41 1.64L2 3.05L5.05 6.1C3.59 6.83 2.22 7.79 1 9l2 2c1.23-1.23 2.65-2.16 4.17-2.78l2.24 2.24A9.823 9.823 0 0 0 5 13l2 2a6.999 6.999 0 0 1 4.89-2.06l7.08 7.08l1.41-1.41z\"/>",
    },
    outlineWifiFind: {
        body: "<path fill=\"currentColor\" d=\"M12 6c4.14 0 7.88 1.68 10.59 4.39L24 8.98A16.88 16.88 0 0 0 12 4C7.31 4 3.07 5.9 0 8.98L12 21l1.41-1.42L2.93 9.08C5.45 7.16 8.59 6 12 6\"/><path fill=\"currentColor\" d=\"M21 14c0-2.24-1.76-4-4-4s-4 1.76-4 4s1.76 4 4 4c.75 0 1.44-.21 2.03-.56L21.59 20L23 18.59l-2.56-2.56c.35-.59.56-1.28.56-2.03m-4 2c-1.12 0-2-.88-2-2s.88-2 2-2s2 .88 2 2s-.88 2-2 2\"/>",
    },
    ethernet: {
        body: "<path fill=\"currentColor\" d=\"M7 15h2v3h2v-3h2v3h2v-3h2v3h2V9h-4V6H9v3H5v9h2zM4.38 3h15.25A2.37 2.37 0 0 1 22 5.38v14.25A2.37 2.37 0 0 1 19.63 22H4.38A2.37 2.37 0 0 1 2 19.63V5.38C2 4.06 3.06 3 4.38 3\"/>",
    },
    menu: {
        body: "<path fill=\"currentColor\" d=\"M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z\"/>",
    },
    baselineBackspace: {
        body: "<path fill=\"currentColor\" d=\"M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12z\"/>",
    },
};

export const getIcon = (name: keyof typeof icons): IconifyIcon => {
    return {
        height: 24,
        width: 24,
        ...icons[name],
    };
}