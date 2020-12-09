type PlainText = string
type QuickReply = string[]

type MessageContent = PlainText | QuickReply

type Message = {
    id?: string
    type: string
    content: MessageContent
    fromUser: boolean
}

type Receiver = {
    image: string
    name: string
    status: string
}

type Theme = {
    primaryColor: string
}

type Widget = {
    chatOpened?: boolean
    right: boolean
    size: string
    round: string
    background: string
    image: string
    animated: boolean
    notification: {
        background: string
        color: string
    }
}

type ChatEmbedConfig = {
    embed: Element
    receiver: Receiver
    theme: Theme,
    widget: Widget
}