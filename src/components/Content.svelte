<script>
    import typing from "../store/typing";
    import messages from "../store/message";
    import Typing from "./chat/Typing.svelte";
    import Message from "./chat/Message.svelte";

    let chat;

    const scrollTo = (element, to, duration) => {
        if (duration <= 0 || element.scrollTop === to) return;

        var difference = to - element.scrollTop;
        var perTick = (difference / duration) * 10;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            scrollTo(element, to, duration - 10);
        }, 10);
    };

    messages.subscribe(() => {
        if (chat) {
            scrollTo(chat, chat.scrollHeight, 300);
        }
    });
</script>

<div class="chat-content" bind:this={chat}>
    {#each $messages as message}
        <Message {message} />
    {/each}

    {#if $typing}
        <Typing />
    {/if}
</div>

<style>
    .chat-content {
        flex: 9;
        display: flex;
        flex-direction: column;
        padding: 10px 16px;
        overflow: auto;
        background-color: white;
    }

    ::-webkit-scrollbar {
        width: 8px;
        background-color: rgba(0, 0, 0, 0);
    }

    ::-webkit-scrollbar:hover {
        background-color: rgba(0, 0, 0, 0.09);
    }

    ::-webkit-scrollbar-thumb:vertical {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:vertical:active {
        background: rgba(0, 0, 0, 0.61);
        border-radius: 100px;
    }
</style>
