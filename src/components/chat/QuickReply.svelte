<script lang="ts">
    import theme from "../../store/theme";
    import cssVars from "../../render/cssVars";
    import chatController from "../../chatController";
    import messages from "../../store/message";
    import type { Message } from "../../types";
    import Text from "./Text.svelte";

    export let message: Message;

    const onSelect = (option) =>
        chatController.send({
            type: "text",
            content: option,
            fromUser: true,
        });

    $: lastMessage = $messages[$messages.length - 1];
    $: hide = lastMessage?.fromUser;
</script>

<Text message={{ ...message, content: message.content.text }} />
{#if !hide}
    <div class="select-options">
        {#each message.content.options as option}
            <div
                class="option"
                use:cssVars={$theme}
                on:click={() => onSelect(option)}
            >
                {option}
            </div>
        {/each}
    </div>
{/if}

<style>
    .select-options {
        display: flex;
        flex-wrap: wrap;
        user-select: none;
        font-size: 16px;
    }

    .option {
        border-color: #888;
        background-color: #eeeeee;
        border-radius: 20px;
        text-align: center;
        border: 1px solid;
        padding: 10px 15px;
        flex-shrink: 0;
        cursor: pointer;
        margin: 0px 5px 5px 0px;
    }
</style>
