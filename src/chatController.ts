import messageStore from './store/message'
import typingStore from './store/typing'
import inputStore from './store/input'

type Receiver = (message: Message) => void;

export default class ChatController {
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