type Component = import('../src/ChatController.svelte').default;
export default Component;

type ChatController = import('../src/chatController').ChatController;

export const typing: ChatController["typing"];
export const toggle: ChatController["toggle"];
export const clear: ChatController["clear"];
export const setInput: ChatController["setInput"];
export const send: ChatController["send"];