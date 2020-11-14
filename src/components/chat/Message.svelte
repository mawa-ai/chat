<script context="module">
    import Text from "./Text.svelte";

    const messageComponents = {
        text: Text
    };
</script>

<script type="ts">
    export let message: Message;
</script>

<svelte:component this={messageComponents[message.type]} {message} />
