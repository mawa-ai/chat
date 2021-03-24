<script lang="ts">
    import theme from "../../store/theme";
    import cssVars from "../../render/cssVars";

    export let message: Message;
</script>

<div class="text" class:user={message.fromUser} use:cssVars={$theme}>
    {message.content}
</div>

<style>
    .text {
        font-size: 16px;
        max-width: 85%;
        border-radius: 16px;
        margin: 0px 0px 12px 0px;
        padding: 14px;
        width: fit-content;
        box-sizing: border-box;
    }

    .text:not(.user) {
        background: #eeeeee;
        color: black;
        align-self: flex-start;
    }

    .text.user {
        background: var(--primary-color);
        color: white;
        align-self: flex-end;
    }
</style>
