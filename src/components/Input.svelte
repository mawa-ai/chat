<script lang="ts">
    import cssVars from "../render/cssVars";
    import theme from "../store/theme";
    import chatController from "../chatController";
    import showInput from "../store/input";

    let content: string = "";
    let width: number;

    const sendContent = () => {
        if (content.trim()) {
            chatController.send({
                type: "text",
                content: content,
                fromUser: true,
            });

            content = "";
        }
    };
</script>

{#if $showInput}
    <div
        class="chat-input"
        bind:clientWidth={width}
        class:contained={width < 440}
    >
        <input
            placeholder="Digite aqui..."
            class="flat-input"
            type="text"
            bind:value={content}
            on:keydown={(e) => e.key === "Enter" && sendContent()}
        />
        <button
            class:dn={!content.trim()}
            class="flat-btn"
            on:click={sendContent}
            use:cssVars={$theme}
        >
            Enviar
        </button>
    </div>
{/if}

<style>
    .chat-input {
        padding: 0px 5%;
        display: flex;
        flex: 1;
        background-color: #ebecf3;
        align-items: center;
    }

    .chat-input .flat-btn {
        height: 50%;
        border: 0;
        color: white;
        flex: 2;
        border-radius: 100px;
        font-size: 16px;
        cursor: pointer;
        min-width: 100px;
        background-color: var(--primary-color);
        transition: all 0.2s ease-in-out;
    }

    .flat-btn:hover {
        opacity: 0.5;
    }

    .chat-input .flat-input {
        height: 100%;
        border: 0;
        background-color: transparent;
        flex: 10;
        padding-right: 5%;
        color: #2e2d33;
        font-size: 20px;
        box-sizing: border-box;
    }

    .chat-input .flat-input:focus {
        outline: 0;
    }

    .contained.chat-input .flat-input {
        font-size: 16px;
    }

    .contained.chat-input .flat-btn {
        min-width: 70px;
        height: 70%;
    }

    .contained.chat-input {
        flex: 1;
    }

    .dn {
        display: none;
    }
</style>
