import messageStore from './store/message'
import typingStore from './store/typing'
import inputStore from './store/input'
import widgetStore from './store/widget'
import type { Message } from './types';

type Receiver = (message: Message) => void;

export class ChatController {
    private readonly receivers: Receiver[] = [];

    constructor() {
        messageStore.subscribe(msgs => {
            typingStore.set(false)

            try {
                this.receivers.forEach(receiver => receiver({ ...msgs[msgs.length - 1] }))
            } catch (e) {
                console.error(e)
            }
        })
    }

    public addReceiver(receiver: Receiver) {
        this.receivers.push(receiver)
    }

    public typing(typing: boolean = true) {
        typingStore.set(typing)
    }

    public toggle(forcedValue?: boolean) {
        widgetStore.update((w) => {
            w.chatOpened = forcedValue === undefined ? !w.chatOpened : forcedValue;
            return w;
        });
    }

    public clear() {
        messageStore.set([])
    }

    public setInput(show: boolean) {
        inputStore.set(show)
    }

    public send(message: Message) {
        if (typeof message === 'string') {
            message = {
                type: 'text',
                content: message,
            }
        }

        if (!message.id) {
            message.id = Math.floor(Date.now() / 1000).toString()
        }

        messageStore.update(m => [...m, message])
    }
}

export default new ChatController