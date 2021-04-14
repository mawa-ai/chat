<script context="module">
    export const typing = chatController.typing.bind(chatController);
    export const toggle = chatController.toggle.bind(chatController);
    export const clear = chatController.clear.bind(chatController);
    export const setInput = chatController.setInput.bind(chatController);
    export const send = chatController.send.bind(chatController);
</script>

<script>
    import Chat from "./Chat.svelte";
    import Widget from "./Widget.svelte";
    import themeStore from "./store/theme";
    import receiverStore from "./store/receiver";
    import widgetStore from "./store/widget";
    import chatController from "./chatController";
    import { createEventDispatcher } from "svelte";

    export let theme = undefined;
    export let receiver = undefined;
    export let widget = undefined;

    $: theme && ($themeStore = theme);
    $: receiver && ($receiverStore = receiver);
    $: widget && ($widgetStore = widget);

    const dispatch = createEventDispatcher();
    chatController.addReceiver((message) => dispatch("message", message));
</script>

{#if $widgetStore}
    <Widget />
{:else}
    <Chat />
{/if}
