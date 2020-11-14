<script lang="ts">
    import receiver from "../store/receiver";
    import cssVars from "../render/cssVars";
    import theme from "../store/theme";

    let widthSize: number = window.innerWidth;
</script>

<style>
    .chat-navbar {
        padding: 0px 5%;
        display: flex;
        flex: 1;
        box-shadow: 1px 1px 20px gray;
        z-index: 0;
        align-items: center;
        background-color: var(--primary-color);
		height: 4rem;
    }

    .receiver-image-container {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .receiver-image {
		height: 80%;
        border-radius: 100%;
        margin-right: 15px;
    }

    .receiver-details {
        display: flex;
        flex-direction: column;
        color: white;
    }

    .receiver-status {
        font-size: 0.8em;
    }

    .receiver-talk {
        color: white;
        text-align: center;
        width: 100%;
    }

    /* .close {
        position: absolute;
        right: 18px;
        width: 28px;
        height: 28px;
        background-image: url("../../Assets/closeIcon.png");
        background-repeat: round;
    }

    .close:hover {
        cursor: pointer;
    } */
</style>

<div class="chat-navbar" use:cssVars={$theme} bind:clientWidth={widthSize}>
    {#if widthSize < 440}
        <div class="receiver-image-container">
            <img
                class="receiver-image"
                src={$receiver.image}
                alt="Chat receiver" />
        </div>
        <div class="receiver-details">
            <span class="receiver-name">{$receiver.name}</span>
            <span class="receiver-status">{$receiver.status}</span>
        </div>
        <!-- {#if isFrame}
            <div class="close" onClick={requestChatClose} />
        {/if} -->
    {:else}<span class="receiver-talk"> Fale com {$receiver.name} </span>{/if}
</div>
