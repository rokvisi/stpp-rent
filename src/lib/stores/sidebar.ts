import { writable } from "svelte/store";

function createSidebar() {
    const { subscribe, set, update } = writable(true);

    return {
        subscribe,
        show: () => set(true),
        hide: () => set(false),
        toggle: () => update((val) => val = !val),
    }
}

export const sidebar = createSidebar();