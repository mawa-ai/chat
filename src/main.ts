import ChatEmbed from './ChatEmbed.svelte';
import themeStore from './store/theme'
import receiverStore from './store/receiver'
import ChatController from './chatController';

export default (props: ChatEmbedConfig) => {
	const {
		embed,
		theme,
		receiver
	} = props

	if (theme) {
		themeStore.set(theme);
	}

	if (receiver) {
		receiverStore.set(receiver);
	}

	new ChatEmbed({
		target: embed
	})

	return ChatController
};