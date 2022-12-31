<script context="module" lang="ts">
    import Text from "./Text.svelte";
    import QuickReply from "./QuickReply.svelte";
    import type { Message } from "../../types";

    const messageComponents = {
        text: Text,
        'quick-reply': QuickReply,
    };
</script>

<script lang="ts">
    export let message: Message;
</script>

<svelte:component this={messageComponents[message.type]} {message} />
