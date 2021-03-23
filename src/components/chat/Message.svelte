<script context="module">
    import Text from "./Text.svelte";
    import QuickReply from "./QuickReply.svelte";

    const messageComponents = {
        text: Text,
        quick: QuickReply,
    };
</script>

<script type="ts">
    export let message: Message;
</script>

<svelte:component this={messageComponents[message.type]} {message} />
