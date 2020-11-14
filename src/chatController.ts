import messageStore from './store/message'
import typingStore from './store/typing'

type Receiver = (message: Message) => void;

class ChatController {
    private readonly receivers: Receiver[] = [];

    constructor() {
        messageStore.subscribe(msgs => {
            typingStore.set(false)
            this.receivers.forEach(receiver => receiver({ ...msgs[msgs.length - 1] }))
        })
    }

    public addReceiver(receiver: Receiver) {
        this.receivers.push(receiver)
    }

    public typing(typing: boolean = true) {
        typingStore.set(typing)
    }

    public send(message: Message) {
        if (!message.id) {
            message.id = Math.floor(Date.now() / 1000).toString()
        }

        messageStore.update(m => [...m, message])
    }
}

export default new ChatController;