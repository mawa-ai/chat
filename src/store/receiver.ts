import { writable } from "svelte/store";

export default writable<Receiver>({
    image: 'https://i.imgur.com/f20IDVc.png',
    name: 'unknown',
    status: 'offline',
    round: '100%',
    preventShrink: false,
});