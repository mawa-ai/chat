<script>
    import Chat from "./Chat.svelte";
    import cssVars from "./render/cssVars";
    import messages from "./store/message";
    import widget from "./store/widget";

    let widget$,
        readen = 0;

    $: {
        if ($widget.chatOpened) {
            readen = $messages.length;
        }
    }

    $: {
        if (widget$) {
            widget$.style.backgroundImage = `url(${$widget.image})`;
        }
    }
</script>

<div
    class="chat-frame part"
    class:hide={!$widget.chatOpened}
    class:animated={$widget.animated}
    class:right={$widget.right}
    class:dn={!$widget.chatOpened}
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
    on:click={() => ($widget.chatOpened = true)}
>
    {#if $messages.length - readen > 0 && $widget.notification !== undefined}
        <div
            class="chat-widget-notification"
            use:cssVars={$widget.notification}
        >
            {$messages.length - readen}
        </div>
    {/if}

    {#if $widget.popupMessage}
        <div class="message-popup-container">
            <div class="message-popup">
                {$widget.popupMessage}
            </div>
        </div>
    {/if}
</div>

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
        padding-top: var(--size);
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

    :not(.animated).hide {
        display: none;
    }

    .message-popup-container {
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        max-width: min(300px, calc(75vw - 100%));
    }

    :not(.right) .message-popup-container {
        right: calc(--size + 10px);
    }

    .right .message-popup-container {
        right: calc(--size + 10px);
        justify-content: flex-end;
    }

    .message-popup {
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
        background-color: white;
        padding: 10px;
        font-size: 12px;
        width: max-content;
        font-family: "Montserrat", sans-serif;
    }

    .part.right {
        right: 25px;
    }

    .part:not(.right) {
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
