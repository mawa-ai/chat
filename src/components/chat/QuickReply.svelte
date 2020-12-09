<script lang="ts">
    import theme from "../../store/theme";
    import cssVars from "../../render/cssVars";
    import chatController from "../../chatController";
    import messages from "../../store/message";

    export let message: Message;

    let hide = false;

    const onSelect = (option) =>
        chatController.send({
            type: "text",
            content: option,
            fromUser: true,
        });

    messages.subscribe((messages) => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.fromUser) {
            hide = true;
        }
    });
</script>

<style>
    .select-options {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        user-select: none;
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

{#if !hide}
    <div class="select-options">
        {#each message.content as option}
            <div
                class="option"
                use:cssVars={$theme}
                on:click={() => onSelect(option)}>
                {option}
            </div>
        {/each}
    </div>
{/if}
