import Chat from './Chat.svelte'
import Widget from './Widget.svelte'
import themeStore from './store/theme'
import receiverStore from './store/receiver'
import widgetStore from './store/widget'
import ChatController from './chatController'

export default (props: ChatEmbedConfig) => {
	const {
		embed,
		theme,
		receiver,
		widget
	} = props

	if (theme) {
		themeStore.set(theme)
	}

	if (receiver) {
		receiverStore.set(receiver)
	}

	if (widget) {
		widgetStore.set(widget)

		new Widget({
			target: embed
		})
	} else {
		new Chat({
			target: embed
		})
	}

	return ChatController
};