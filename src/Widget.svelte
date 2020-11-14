<script>
    import { onMount } from "svelte";

    import Chat from "./Chat.svelte";
    import cssVars from "./render/cssVars";
    import messages from "./store/message";
    import widget from "./store/widget";

    let widget$, hide = true, readen = 0

    const openChat = () => {
        hide = false
        readen = $messages.length

        widget.update((w) => {
            w.chatOpened = true
            return w;
        });
    }

    onMount(() => {
        widget.subscribe((w) => {
            widget$.style.backgroundImage = `url(${w.image})`;
        })
    })
</script>

<style>
    @keyframes widget-slide-in {
        from {
            display: block;
            opacity: 0;
            transform: translate(0, 100px);
        }

        to {
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    @keyframes widget-slide-out {
        from {
            opacity: 1;
            transform: translate(0, 0);
        }

        to {
            visibility: hidden;
            opacity: 0;
            transform: translate(0, 100px);
        }
    }

    .dn {
        display: none;
    }

    .chat-widget {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: var(--size);
        width: var(--size);
        border-radius: var(--round);
        background-color: var(--background);
    }

    .part {
        box-shadow: -3px 3px 10px -5px black;
        bottom: 25px;
        z-index: 9999999;
        position: fixed;
    }

    .animated {
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }

    .animated.hide {
        animation-name: widget-slide-out;
    }

    .animated:not(.hide) {
        animation-name: widget-slide-in;
    }

    .right {
        right: 25px;
    }

    :not(.right) {
        left: 25px;
    }

    .chat-widget:hover {
        cursor: pointer;
    }

    .chat-widget-notification {
		font-family: "Montserrat", sans-serif;
        box-shadow: -3px 3px 10px -5px black;
        border-radius: 50%;
        line-height: 18px;
        font-size: 14px;
        width: 18px;
        height: 18px;
        position: absolute;
        text-align: center;
        bottom: calc(var(--size) - 15%);
        left: calc(var(--size) - 40%);
        color: var(--color);
        background-color: var(--background);
    }

    .chat-frame {
        height: 610px;
        min-height: 480px;
        max-height: 80%;
        width: 380px;
        border: 0;
        border-radius: 12px;
    }

    @media screen and (max-width: 750px) {
        .chat-frame {
            width: 100%;
            height: 100%;
            left: 0 !important;
            bottom: 0 !important;
            border-radius: 0;
            max-width: unset;
            max-height: unset;
        }
    }
</style>

<div
    class="chat-frame part"
    class:hide={!$widget.chatOpened}
    class:animated={$widget.animated}
    class:right={$widget.right}
    class:dn={hide}
>
    <Chat />
</div>

<div
    class="chat-widget part"
    class:right={$widget.right}
    class:animated={$widget.animated}
    class:hide={$widget.chatOpened}
    use:cssVars={$widget}
    bind:this={widget$}
    on:click={openChat}>
    {#if $messages.length - readen > 0 && $widget.notification !== undefined}
        <div
            class="chat-widget-notification"
            use:cssVars={$widget.notification}>
            {$messages.length - readen}
        </div>
    {/if}
</div>
