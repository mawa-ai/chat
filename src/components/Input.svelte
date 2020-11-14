<script lang="ts">
    import cssVars from "../render/cssVars";
    import theme from "../store/theme";
    import ChatController from '../chatController'

    let input: string = "";

    const sendInput = () => {
        if (input.trim()) {
            ChatController.send({
                type: 'text',
                content: input,
                fromUser: true,
            })

            input = "";
        }
    };
</script>

<style>
    .chat-input {
        padding: 0px 5%;
        display: flex;
        flex: 2;
        background-color: #ebecf3;
        align-items: center;
    }

    @media screen and (max-width: 440px) {
        .chat-input {
            flex: 1;
        }
    }

    .chat-input .flat-btn {
        height: 50%;
        border: 0;
        color: white;
        flex: 2;
        border-radius: 100px;
        font-size: 1em;
        cursor: pointer;
        min-width: 100px;
        background-color: var(--primary-color);
        transition: all 0.2s ease-in-out;
    }

    .flat-btn:hover {
        opacity: 0.5;
    }

    @media screen and (max-width: 440px) {
        .chat-input .flat-btn {
            min-width: 70px;
            height: 70%;
        }
    }

    .chat-input .flat-input {
        height: 100%;
        border: 0;
        background-color: transparent;
        flex: 10;
        padding-right: 5%;
        color: #2e2d33;
        font-size: 1.3em;
        box-sizing: border-box;
    }

    .chat-input .flat-input:focus {
        outline: 0;
    }

    @media screen and (max-width: 440px) {
        .chat-input .flat-input {
            font-size: 1em;
        }
    }

    .dn {
        display: none;
    }
</style>

<div class="chat-input">
    <input
        placeholder="Digite aqui..."
        class="flat-input"
        type="text"
        bind:value={input}
        on:keydown={(e) => e.key === 'Enter' && sendInput()} />
    <button
        class:dn={!input.trim()}
        class="flat-btn"
        on:click={sendInput}
        use:cssVars={$theme}>
        Enviar
    </button>
</div>
