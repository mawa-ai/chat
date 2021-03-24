<script lang="ts">
    import receiver from "../store/receiver";
    import widget from "../store/widget";
    import cssVars from "../render/cssVars";
    import theme from "../store/theme";

    let widthSize: number = window.innerWidth;

    const closeChat = () => {
        widget.update((w) => {
            w.chatOpened = false;
            return w;
        });
    };
</script>

<div class="chat-navbar" use:cssVars={$theme} bind:clientWidth={widthSize}>
    {#if widthSize < 440}
        <div
            class="receiver-image-container"
            use:cssVars={{ round: $receiver.round }}
        >
            <img
                class="receiver-image"
                src={$receiver.image}
                alt="Chat receiver"
            />
        </div>
        {#if $receiver.name || $receiver.status}
            <div class="receiver-details">
                <span class="receiver-name">{$receiver.name}</span>
                <span class="receiver-status">{$receiver.status}</span>
            </div>
        {/if}
        {#if $widget !== undefined}
            <div class="close" on:click={closeChat} />
        {/if}
    {:else}
        <span class="receiver-talk"> Fale com {$receiver.name}</span>
    {/if}
</div>

<style>
    .chat-navbar {
        padding: 0px 5%;
        display: flex;
        flex: 1;
        box-shadow: 1px 1px 20px gray;
        z-index: 0;
        align-items: center;
        background-color: var(--primary-color);
        height: 64px;
    }

    .receiver-image-container {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .receiver-image {
        height: 80%;
        border-radius: var(--round);
        margin-right: 15px;
    }

    .receiver-details {
        display: flex;
        flex-direction: column;
        color: white;
    }

    .receiver-name {
        font-size: 16px;
    }

    .receiver-status {
        font-size: 14px;
    }

    .receiver-talk {
        color: white;
        text-align: center;
        width: 100%;
    }

    .close {
        position: absolute;
        right: 18px;
        width: 28px;
        height: 28px;
        background-image: url("https://i.imgur.com/mGuxwqh.png");
        background-repeat: round;
    }

    .close:hover {
        cursor: pointer;
    }
</style>
